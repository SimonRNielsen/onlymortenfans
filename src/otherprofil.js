import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"

export function OtherProfileScreen(props) { 
    let mortenlove = useInput("");
    let otherprofil = props.posterID;
    const day = new Date(otherprofil.user.joinTime);
    let catchPhrase = otherprofil.user.catchPhrase || "Haven't entered yet, still love Morten for ever and ever";
    const [imageError, setImageError] = useState(false);

    function holyboard() {
        props.setPageState(pageStates.LOGGED_IN);
    }

    function logout() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
        props.setUser({ user: null, email: null, id: null });
        alert("You are now logged out");
    }
    
    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">The holy profil of {otherprofil.user.name}</h1>
            </div>
            <div className="holyWhiteboardContent">
                <label><b>Name:</b> {otherprofil.user.name}</label>
                <br />
                <label><b>Member since:</b> {`${day.getDate()}/${day.getMonth() + 1} ${day.getFullYear()}`}</label>
                <br />
                <label {...mortenlove}><b>What do you love most about Morten</b></label>
                <br />
                <label  className="mortenlove">{catchPhrase}</label>
                <label><b>Profil picture - use a url:</b></label>
                <br />
                <img src={otherprofil.user.pictureURL} hidden={imageError} onError={() => setImageError(true)} onLoad={() => setImageError(false)} className="profilPicture" alt=""></img>
                <br />
            </div>
            <div>
                <button className="loginButton" id="logoutButton" onClick={logout}>Log out</button>
                <button className="loginButton" id="profilButton" onClick={holyboard}>Back</button>
                <h2 className="showUsername">Our holy member: {props.userInfo.user}</h2>
            </div>
        </>
    )

}