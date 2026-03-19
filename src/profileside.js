import React, { useRef, useState} from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import { updateProfile } from "./api/api";
import "./styles.css"

export function ProfileScreen(props) {

    let profilepicture = useInput("");



    let mortenlove = useInput("");
    const textArearRef = useRef(null);
    let [savingProfile, setSavingProfile] = useState(false);
    let [catchPhrase, setCatchPhrase] = useState("");
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

    async function safeProfil () {
        setSavingProfile(true);
        
        let profileUpdateDTO = {
            id: props.userInfo.id,
            name: props.userInfo.user,
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
        
    }

    function handleInput(e) {
        const el = textArearRef.current;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <>
            <div>
                <h1 className="holywhiteboardHeader">Your profil {props.userInfo.user}</h1>
            </div>
            <div className="holyWhiteboardContent">
                <button className="loginButton" id="safeButton" onClick={safeProfil} disabled={savingProfile}>Save</button>
                <label><b>Name:</b> {props.user.name}</label>
                <br />
                <label><b>Email:</b> {props.userInfo.email}</label>
                <br />
                <label><b>Member since:</b> {`${day.getDate()}/${day.getMonth() + 1} ${day.getFullYear()}`}</label>
                <br />
                <label {...mortenlove}><b>What do you love most about Morten</b></label>
                <br />
                <textarea ref={textArearRef} className="profilInput" onInput={handleInput} onChange={(event) => setCatchPhrase(event.target.value)}></textarea>
                <br />
                <label><b>Profil picture - use a url:</b></label>
                <br />
                <input {...profilepicture} className="profilInput"></input>
                <img src={profilepicture.value} hidden={imageError} onError={() => setImageError(true)} onLoad={() => setImageError(false)} className="profilPicture" alt=""></img>
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