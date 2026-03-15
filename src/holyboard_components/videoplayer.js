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
            style={{aspectRatio: "16/9", width: "50%", height: "50%", objectFit: "contain", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "9999", margin: "5%" }}
        />
    );

}

function ImageDisplayer(props) {

    return (
        <img
            src={props.src} alt="from post"
            className="enlargedPicture" 
            style={{aspectRatio: "16/9", width: "50%", height: "50%", objectFit: "contain", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "9999", margin: "5%"}}
        />
    );

}

export function DisplayContent(props) {

    let videoID = checkURL();
    let isVideo = videoID !== null;

    function checkURL() {

        let parsed = new URL(props.src);

        if (parsed.hostname === "youtu.be") {
            return parsed.pathname.slice(1);
        }

        if (parsed.hostname.includes("youtube.com")) {
            return parsed.searchParams.get("v");
        }

        return null;
    }

    return (
        <>
            {isVideo ? <VideoDisplayer video={videoID}/> : <ImageDisplayer {...props}/>}
        </>
    );

}