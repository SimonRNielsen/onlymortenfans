import React, { useRef, useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import { updateProfile } from "./api/api";
import "./styles.css"

export function ProfileScreen(props) {

    let profilepicture = useInput(profilePictureDefault());
    let mortenlove = useInput("");
    const textArearRef = useRef(null);
    let [savingProfile, setSavingProfile] = useState(false);
    let [catchPhrase, setCatchPhrase] = useState(catchPhraseDefault());
    let [name, setName] = useState(props.user.name);
    const day = new Date(props.user.joinTime);
    const [imageError, setImageError] = useState(false);

    function holyboard() {
        props.setPageState(pageStates.LOGGED_IN);
    }

    function logout() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
        props.setUser({ user: null, email: null, id: null });
        alert("You are now logged out");
    }

    //If catchphrase isn't filled out change it to a default message
    function catchPhraseDefault() {
        if (!props.user.catchPhrase) {
            return "Haven't entered yet, still love Morten for ever and ever";
        }
        return props.user.catchPhrase;
    }

    //If there isn't a picture replace it with an empty string
    function profilePictureDefault() {
        if (!props.user.pictureURL) {
            return "";
        }
        return props.user.pictureURL;
    }

    async function safeProfil() {
        setSavingProfile(true);

        let profileUpdateDTO = {
            id: props.userInfo.id,
            name: name,
            catchPhrase: catchPhrase,
            pictureURL: profilepicture.value
        };

        let profileUpdateResponse;
        try {
            profileUpdateResponse = await updateProfile(profileUpdateDTO);
        }
        catch (error) {
            console.log(error)
            setSavingProfile(false);
            return;
        }

        setSavingProfile(false);
        if (!profileUpdateResponse.ok) {
            alert("Failed to save update");
            return;
        }

        alert("Your profil is now saved");


        props.setUser({
            ...props.userInfo,
            user: name,
            catchPhrase: catchPhrase,
            pictureURL: profilepicture.value
        });
    }

    //Auto resize the inputbox if the text is to big for the box
    function handleInput(e) {
        const el = textArearRef.current;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">Your profil {props.user.name}</h1>
            </div>
            <div className="holyWhiteboardContent">
                <button className="loginButton" id="safeButton" onClick={safeProfil} disabled={savingProfile}>Save</button>
                <label><b>Name:</b></label>
                <textarea ref={textArearRef} className="profilInput" onInput={handleInput} onChange={(event) => setName(event.target.value)} defaultValue={props.user.name}></textarea>
                <br />
                <label><b>Email:</b> {props.userInfo.email}</label>
                <br />
                <label><b>Member since:</b> {`${day.getDate()}/${day.getMonth() + 1} ${day.getFullYear()}`}</label>
                <br />
                <label {...mortenlove}><b>What do you love most about Morten</b></label>
                <br />
                <textarea ref={textArearRef} className="profilInput" onInput={handleInput} onChange={(event) => setCatchPhrase(event.target.value)} defaultValue={catchPhraseDefault()}></textarea>
                <br />
                <label><b>Profil picture - use a url:</b></label>
                <br />
                <input {...profilepicture} className="profilInput"></input>
                {profilepicture.value !== "" ? <img src={profilepicture.value} hidden={imageError} onError={() => setImageError(true)} onLoad={() => setImageError(false)} className="profilPicture" alt="" ></img> : <></>}
                <br />
            </div>
            <div>
                <button className="loginButton" id="logoutButton" onClick={logout}>Log out</button>
                <button className="loginButton" id="profilButton" onClick={holyboard}>Back</button>
                <h2 className="showUsername">Our holy member: {props.user.name}</h2>
            </div>
        </>
    )

}