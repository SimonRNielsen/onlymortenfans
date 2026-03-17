import React from "react";
import "../styles.css"

function VideoDisplayer(props) {

    let url = "https://www.youtube.com/embed/" + props.video;

    return (
        <iframe
            src={url}
            title="Embedded Video"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="embeddedVideo"
        />
    );

}

function ImageDisplayer(props) {

    return (
        <img
            src={props.src} alt="from post"
            className="enlargedPicture" 
        />
    );

}

export function DisplayContent(props) {

    let videoID = checkURL();
    let isVideo = videoID !== null;

    function checkURL() {

        if (!props.src) {
            return null;
        }

        let parsed = new URL(props.src);

        if (parsed.hostname === "youtu.be") {
            return parsed.pathname.slice(1);
        }

        if (parsed.hostname.includes("youtube.com")) {
            return parsed.searchParams.get("v");
        }

        return null;
    }

    function closeContent() {
        props.closeContent()
    }

    return (
        <div className="contentOverlay">
            <button className="closeContentButton" onClick={closeContent}>x</button>
            {isVideo ? <VideoDisplayer video={videoID}/> : <ImageDisplayer {...props}/>}
        </div>
    );

}