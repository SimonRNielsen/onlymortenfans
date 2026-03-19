import React, { useRef } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"

export function OtherProfileScreen(props) { 
let profilepicture = useInput("");
    let hide = !profilepicture.value.includes(".jpg");
    let mortenlove = useInput("");
    const textArearRef = useRef(null);
    let otherprofil = props.posterID;

    function holyboard() {
        props.setPageState(pageStates.LOGGED_IN);
    }

    function logout() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
        props.setUser({ user: null, email: null, id: null });
        alert("You are now logged out");
    }


    function handleInput(e) {
        const el = textArearRef.current;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">En anden profil end din muhahahahah</h1>
            </div>
            <div className="holyWhiteboardContent">
                <label><b>Name:</b> {props.userInfo.user}</label>
                <br />
                <label><b>Email:</b> {props.userInfo.email}</label>
                <br />
                <label><b>Member since:</b> xxx</label>
                <br />
                <label {...mortenlove}><b>What do you love most about Morten</b></label>
                <br />
                <textarea ref={textArearRef} className="profilInput" onInput={handleInput}></textarea>
                <br />
                <label><b>Profil picture - use a url:</b></label>
                <br />
                <input {...profilepicture} className="profilInput"></input>
                <img src={profilepicture.value} hidden={hide} className="profilPicture" alt=""></img>
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