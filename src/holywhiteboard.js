import React, { useEffect, useRef, useState } from "react";
import { Post } from "./components/post";
import { DisplayContent } from "./components/videoplayer";
import { checkUsers, getUsers, getPosts, updatePosts } from "./api/api";
import { useClick } from "./hooks";
import { ErrorOccured } from "./login";
// import { pageStates } from "./enums";
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

    // function logOut() {
    //     props.setUser({ user: null, email: null, id: null });
    //     props.setPageState(pageStates.NOT_LOGGED_IN);
    // }
    
    return (
        <div>
            {serverConnectionActive ? <></> : <ErrorOccured text="Error with server connection"/>}
            {videoplayer.src !== "" ? <DisplayContent src={videoplayer.src}/> : <></>}
            {posts.map((post) => <Post key={post.postID} {...post} users={users} user={props.userInfo}/>)}
        </div>
    );

}