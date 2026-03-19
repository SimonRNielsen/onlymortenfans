import React, { useState } from "react";
import { addComment, addOpinion, deleteComment, deletePost } from "../api/api";
import like from "../pics/glorie2.png";
import dislike from "../pics/death-goose_small.png";
import { useInput } from "../hooks";
import { pageStates } from "../enums";
import "../styles.css"

export function Post(props) {
    const [deleteSent, setDeleteSent] = useState(false);
    const [sentDeleteRequest, setSentDeleteRequest] = useState(false);
    const [opinionPending, setOpinionPending] = useState(false);

    let activeUser = props.user.id;
    let postID = props.postID;
    let posterID = props.posterID;
    let posterName = props.users[props.posterID]?.name || "Loading...";
    let post = props.post;
    let pictureURL = props.pictureURL;
    let comments = props.comments;
    let likes = props.likes;
    let dislikes = props.dislikes;
    let video = checkURL();
    let notPostOwner = activeUser !== posterID;

    function checkURL() {
        if (!pictureURL) {
            return null;
        }

        let parsed = new URL(pictureURL);

        if (parsed.hostname === "youtu.be") {
            return parsed.pathname.slice(1);
        }

        if (parsed.hostname.includes("youtube.com")) {
            return parsed.searchParams.get("v");
        }

        return null;
    }

    async function deleteThisPost() {

        if (notPostOwner) {
            return;
        }

        setSentDeleteRequest(true);

        let deletePostDTO = {
            postID: postID,
            posterID: activeUser
        };

        let deletePostResponse;

        try {
            deletePostResponse = await deletePost(deletePostDTO);
        }
        catch (error) {
            console.log(error);
            setSentDeleteRequest(false);
            return;
        }

        setSentDeleteRequest(false);

        if (!deletePostResponse.ok) {
            return;
        }

        setDeleteSent(true);
        props.triggerUpdate();

    }

    async function setOpinion(opinion) {

        if (opinionPending) {
            return;
        }

        setOpinionPending(true);

        let opinionDTO = {
            postID: postID,
            userID: activeUser,
            opinion: opinion
        };

        let opinionResponse;

        try {
            opinionResponse = await addOpinion(opinionDTO);
        }

        catch (error) {
            console.log(error);
            return;
        }

        if (!opinionResponse.ok) {
            return;
        }

        setOpinionPending(false);
        props.triggerUpdate();
    }

    function seeOthersProfile(user) {
        props.setPageState(pageStates.OTHER_PROFILE_SIDE);
        props.setPosterID({user});
    }


    return (
        <div className="postFrame" hidden={deleteSent}>
            <h3 onClick={() => seeOthersProfile(props.users[posterID])}>{posterName}</h3><button hidden={notPostOwner} disabled={sentDeleteRequest} onClick={deleteThisPost}>x</button>
            <hr />
            {pictureURL ? <img className="postImage" onClick={() => props.onClick(pictureURL)} src={video === null ? pictureURL : `https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt="" /> : <></>}
            <div className="post">{post}</div>
            <label className="opinionLabel">Likes:</label><div className="likeContainer" onClick={() => setOpinion(true)}><img src={like} alt="likes" /><div className="likeText">{likes.length}</div></div>
            <label className="opinionLabel">Dislikes</label><div className="likeContainer" onClick={() => setOpinion(false)}><img src={dislike} alt="dislikes" /><div className="dislikeText">{dislikes.length}</div></div>
            <hr />
            <NewComment postID={postID} posterID={activeUser} triggerUpdate={props.triggerUpdate} commentFailed={props.commentFailed} />
            {comments.map((comment) => <Comment key={comment.commentID} {...comment} users={props.users} user={props.user} triggerUpdate={props.triggerUpdate} />)}
            <hr />
        </div>
    );

}

export function givemethatname(name) {
    let myname = name;
    console.log(myname);
}

function Comment(props) {
    const [deleteSent, setDeleteSent] = useState(false);
    const [sentDeleteRequest, setSentDeleteRequest] = useState(false);

    let notCommentOwner = props.user.id !== props.posterID;

    async function deleteThisComment() {

        if (notCommentOwner) {
            return;
        }

        setSentDeleteRequest(true);

        let deleteCommentDTO = {
            commentID: props.commentID,
            posterID: props.user.id
        };

        let deleteCommentResponse;

        try {
            deleteCommentResponse = await deleteComment(deleteCommentDTO);
        }

        catch (error) {
            console.log(error);
            setSentDeleteRequest(false);
            return;
        }

        setSentDeleteRequest(false);

        if (!deleteCommentResponse.ok) {
            return;
        }

        setDeleteSent(true);
        props.triggerUpdate();

    }

    return (
        <div className="commentFrame" hidden={deleteSent}>
            <label className="commentPoster"><b>{props.users[props.posterID].name}:</b></label><button onClick={deleteThisComment} hidden={notCommentOwner} disabled={sentDeleteRequest}>x</button>
            <p className="commentText">{props.comment}</p>
        </div>
    );

}

function NewComment(props) {
    let comment = useInput("");
    let [postPending, setPostPending] = useState(false);

    async function createComment(event) {
        event.preventDefault();

        if (postPending) {
            return;
        }

        setPostPending(true);

        let newCommentDTO = {
            postID: props.postID,
            posterID: props.posterID,
            comment: comment.value
        };

        let newCommentResponse;

        try {
            newCommentResponse = await addComment(newCommentDTO);
        }

        catch (error) {
            console.log(error);
            setPostPending(false);
            props.commentFailed(false);
            return;
        }

        setPostPending(false);
        if (!newCommentResponse.ok) {
            props.commentFailed(false);
            return;
        }

        comment.reset();
        props.triggerUpdate();

    }

    return (
        <form className="newCommentForm" onSubmit={createComment}>
            <textarea className="newCommentText" {...comment} />
            <br />
            <button type="submit" disabled={postPending}>Send</button>
        </form>
    );

}