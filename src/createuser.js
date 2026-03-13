import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"

const createURL = "https://reactapi-6jhi.onrender.com/api/users/create";

export function CreateScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDiabled] = useState(false);
    let username = useInput("");

    function validInputs() {

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.value)) {
            // "/^ [^\s@] +@ [^\s@] +\. [^\s@] + $/" = RegEx -> regular expression,
            // i de her tilfælde betyder det at den opbygger et eksempel hvor der er tekst før @ og imellem det og et . og afslutter med tekst igen 
            // test holder de 2 strings op mod hinanden
            // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ -> /^ = start af streng, (?=.*[a-z]) = indeholder et lille bogstav, (?=.*[A-Z]) = indeholder et stort bogstav, (?=.*\d) = indeholder et tal, .{8,} er mindst 8 i længden, $/ = slut
            return true;
        }

        return false;

    }

    return (
        <div className="loginScreen">
            <form id="loginForm" onSubmit={handleSubmit}>
                <label className="loginLabel">Name:</label>
                <input {...username} className="loginInput" />
                <br />
                {TooltipUsername(username.value)}
                <label className="loginLabel">Email:</label>
                <input {...email} className="loginInput" />
                <br />
                {/* Tooltip/feedback */}
                <label className="loginLabel">Password:</label>
                <input {...password} type="password" className="loginInput" />
                <br />
                {/* Tooltip/feedback */}
                <button type="submit" disabled={inputDisabled || !validInputs()} className="loginButton">Login</button>
            </form>
            <button disabled={inputDisabled} className="loginButton" onClick={switchToLogin}>Back to login</button> {/*Lav tilbage kanp */}
        </ div>
    );

    function switchToLogin() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
    }

    function TooltipUsername(username) {
        if (/\ /.test(username) || username.length < 2) {
            // console.log("False");
            return false;
        }
        else {
            // console.log("True");
            return true;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault(); //Ellers refresher submit hjemmesiden
        setInputDiabled(true);

let loginDTO = {

}

    }

}