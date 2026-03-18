import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"
import { EmailTooltip, PasswordTooltip } from "./login";
import { create } from "./api/api";
import undercover from "./pics/underCoverMortenSling0.png";

export function ProfileScreen(props) {

    let profilepicture = useInput("");
    let hide = !profilepicture.value.includes(".jpg");
    let mortenlove = useInput("");

    function holyboard() {
        props.setPageState(pageStates.LOGGED_IN);
    }

    function logout() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
        props.setUser({ user: null, email: null, id: null });
        alert("You are now logged out");
    }

    function safeProfil () {
        alert("Your profil is now safe");
    }

    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">The profil of our {props.userInfo.user}</h1>
            </div>
            <div className="holyWhiteboardContent">
                <label>Name: {props.userInfo.user}</label>
                <br />
                <label>Email: {props.userInfo.email}</label>
                <br />
                <label {...mortenlove}>What do you love most about Morten</label>
                <br />
                <input className="profilInput"></input>
                <br />
                <label>Profil picture - use a url:</label>
                <br />
                <input {...profilepicture} className="profilInput"></input>
                <img src={profilepicture.value} hidden={hide}></img>
                <br />
                <button className="loginButton" id="safeButton" onClick={safeProfil}>Safe</button>
            </div>
            <div>
                <button className="loginButton" id="logoutButton" onClick={logout}>Log out</button>
                <button className="loginButton" id="profilButton" onClick={holyboard}>Back</button>
                <h2 className="showUsername">Our holy member: {props.userInfo.user}</h2>
            </div>
        </>
    )

}