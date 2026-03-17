import React, { useEffect, useRef, useState } from "react";
import { Post } from "./components/post";
import { DisplayContent } from "./components/videoplayer";
import { checkUsers, getUsers, getPosts, updatePosts, addNewPost } from "./api/api";
import { useClick, useInput } from "./hooks";
import { ErrorOccured } from "./login";
import "./styles.css"

export function HolyWhiteboard(props) {
    const [serverConnectionActive, setServerConnection] = useState(true);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const postHash = useRef(null);
    const userHash = useRef(null);
    const videoplayer = useClick("");
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
        
        userListingDTOArray.forEach((user) => { newDictionary[user.id] = user.name; });

        setUsers(newDictionary);

    }
    
    return (
        <div>
            {serverConnectionActive ? <></> : <ErrorOccured text="Error with server connection, action failed"/>}
            {videoplayer.src !== "" ? <DisplayContent src={videoplayer.src}/> : <></>}
            <CreateNewPost user={props.userInfo} triggerUpdate={update} postFailed={setServerConnection}/>
            {posts.map((post) => <Post key={post.postID} {...post} users={users} user={props.userInfo} onClick={videoplayer.onClick} triggerUpdate={update} commentFailed={setServerConnection}/>)}
        </div>
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
            setSubmittingPost(false);
            return;
        }

        setSubmittingPost(false);

        if (!createPostResponse.ok) {
            return;
        }

        props.triggerUpdate();
        content.value = "";
        post.value = "";

    }

    function validateLink() {
        try {
            new URL(content.value);
            return content.value;
        } 
        catch {
            return null;
        }
    }

    return(
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label>Anything interesting to post?</label><br /><textarea className="newPostText" {...post}/><br />
            <label>Youtube video or image link:</label><br /><input className="newPostInput" {...content}/><br />
            <br /><button type="submit" className="newPostButton" disabled={submittingPost}>Submit</button>
        </ form>
    );

}