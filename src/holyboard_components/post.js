import React, { useState } from "react";
import { DisplayContent } from "./videoplayer";
import "../styles.css"

export function Post(props) {

    console.log(props);

    let postID = props.postID;
    let posterID = props.posterID;
    let posterName = props.users[props.posterID];
    let post = props.post;
    let pictureURL = props.pictureURL;
    let comments = props.comments;
    let likes = props.likes;
    let dislikes = props.dislikes;

    return (
        <>
            <div>{posterName}</div>
        </>
    );

}