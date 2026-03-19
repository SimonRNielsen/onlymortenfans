import React, { useEffect, useRef, useState } from "react";
import { Post } from "./components/post";
import { DisplayContent } from "./components/videoplayer";
import { checkUsers, getUsers, getPosts, updatePosts, addNewPost } from "./api/api";
import { useClick, useInput } from "./hooks";
import { ErrorOccured } from "./login";
import "./styles.css"
import { pageStates } from "./enums";

export function HolyWhiteboard(props) {
    const [serverConnectionActive, setServerConnection] = useState(true);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const postHash = useRef(null);
    const userHash = useRef(null);
    const videoplayer = useClick(null);
    console.log(props.userInfo);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        update();
        let interval = setInterval(() => {
            update();
        }, 20000);

        return () => clearInterval(interval);
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    async function update() {

        let getPostHashResponse;
        let getUserHashResponse;

        try {
            let getPostHash = updatePosts();
            let getUserHash = checkUsers();

            getPostHashResponse = await getPostHash;
            getUserHashResponse = await getUserHash;

            if (!getPostHashResponse.ok || !getUserHashResponse.ok) {
                setServerConnection(false);
                return;
            }

            setServerConnection(true);

        }

        catch (error) {
            console.log(error);
            return;
        }

        let postResponseData = await getPostHashResponse.text();
        let userResponseData = await getUserHashResponse.text();

        let newUsers = userResponseData !== userHash.current;
        let newPosts = postResponseData !== postHash.current;

        if (!newPosts && !newUsers) {
            return;
        }

        postHash.current = postResponseData;
        userHash.current = userResponseData;

        getPostsOrUsers(newUsers, newPosts);

    }

    async function getPostsOrUsers(newUsers, newPosts) {

        let getNewUsersResponse;
        let getNewPostsResponse;

        try {
            let getNewPosts;
            let getNewUsers;
            if (newPosts) {
                getNewPosts = getPosts();
            }
            if (newUsers) {
                getNewUsers = getUsers();
            }
            if (newPosts) {
                getNewPostsResponse = await getNewPosts;
                if (!getNewPostsResponse.ok) {
                    return;
                }
            }
            if (newUsers) {
                getNewUsersResponse = await getNewUsers;
                if (!getNewUsersResponse.ok) {
                    return;
                }
            }
        }

        catch (error) {
            console.log(error);
            setServerConnection(false);
            return;
        }

        if (newUsers) {
            let getNewUsersData = await getNewUsersResponse.json();
            fillUsers(getNewUsersData);
        }

        if (newPosts) {
            let getNewPostsData = await getNewPostsResponse.json();
            fillPosts(getNewPostsData);
        }

    }

    function fillPosts(postDTOArray) {

        setPosts(postDTOArray);

    }

    function fillUsers(userListingDTOArray) {

        let newDictionary = {};

        userListingDTOArray.forEach((user) => { newDictionary[user.id] = { name: user.name, pictureURL: user.pictureURL, catchPhrase: user.catchPhrase, joinTime: user.joinTime }; });

        setUsers(newDictionary);

    }

    function logout() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
        props.setUser({ user: null, email: null, id: null });
        alert("You are now logged out");
    }

    function profileSetting(user) {
        props.setPageState(pageStates.PROFILE_SIDE);
        props.setPosterID({user});
    }

    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">The holy whiteboard of Only Morten Fans</h1>
            </div>
            <div className="holyWhiteboardContent">
                {serverConnectionActive ? <></> : <ErrorOccured text="Error with server connection, action failed" />}
                {videoplayer.src !== null ? <DisplayContent src={videoplayer.src} closeContent={videoplayer.reset} /> : <></>}
                <CreateNewPost user={props.userInfo} triggerUpdate={update} postFailed={setServerConnection} />
                {posts.slice().reverse().map((post) => <Post key={post.postID} setPosterID={props.setPosterID} setPageState={props.setPageState} {...post} users={users} user={props.userInfo} onClick={videoplayer.onClick} triggerUpdate={update} commentFailed={setServerConnection} />)}
            </div>
            <div>
                <button className="loginButton" id="logoutButton" onClick={logout}>Log out</button>
                <button className="loginButton" id="profilButton" onClick={() => profileSetting(users[props.userInfo.id])}>Profil</button>
                <h2 className="showUsername">Our holy member: {props.userInfo.user}</h2>
            </div>
        </>
    );

}

function CreateNewPost(props) {
    let [submittingPost, setSubmittingPost] = useState(false);
    let content = useInput("");
    let post = useInput("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (submittingPost) {
            return;
        }

        setSubmittingPost(true);

        let validLink = validateLink();

        let createPostDTO = {
            posterID: props.user.id,
            post: post.value,
            pictureURL: validLink
        };

        let createPostResponse;

        try {
            createPostResponse = await addNewPost(createPostDTO);
        }
        catch (error) {
            console.log(error);
            props.postFailed(false);
            setSubmittingPost(false);
            return;
        }

        setSubmittingPost(false);

        if (!createPostResponse.ok) {
            props.postFailed(false);
            return;
        }

        content.reset();
        post.reset();
        props.triggerUpdate();

    }

    function validateLink() {
        if (!content.value) {
            return null;
        }

        try {
            new URL(content.value);
            return content.value;
        }
        catch {
            return null;
        }
    }

    return (
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label>Anything interesting to post?</label><br /><textarea className="newPostText" {...post} /><br />
            <label>Youtube video or image link:</label><br /><input className="newPostInput" {...content} /><br />
            <br /><button type="submit" className="newPostButton" disabled={submittingPost}>Submit</button>
        </ form>
    );

}