import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import { login } from "./api/api";
import "./styles.css"

export function LoginScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDisabled] = useState(false);
    let [inputValid, setInputValid] = useState(true);
    let [serverError, setServerError] = useState(false);
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    let containsCapitalCharacter = /[A-Z]/.test(password.value);
    let containsSmallCharacter = /[a-z]/.test(password.value);
    let containsNumber = /\d/.test(password.value);
    let isLongEnough = password.value.length >= 8;
    let validPassword = containsCapitalCharacter && containsSmallCharacter && containsNumber && isLongEnough;
    // "/^ [^\s@] +@ [^\s@] +\. [^\s@] + $/" = RegEx -> regular expression,
    // i de her tilfælde betyder det at den opbygger et eksempel hvor der er tekst før @ og imellem det og et . og afslutter med tekst igen 
    // test holder de 2 strings op mod hinanden
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ -> /^ = start af streng, (?=.*[a-z]) = indeholder et lille bogstav, (?=.*[A-Z]) = indeholder et stort bogstav, (?=.*\d) = indeholder et tal, .{8,} er mindst 8 i længden, $/ = slut


    function validInputs() {
        return validEmail && validPassword;
    }

    function switchToCreateUser() {
        props.setPageState(pageStates.CREATE_USER);
    }

    async function handleSubmit(event) {

        event.preventDefault(); //Ellers refresher submit hjemmesiden
        setInputDisabled(true);

        let loginDTO = {
            email: email.value,
            password: password.value
        }

        let response;

        try {
            response = await login(loginDTO);
            if (!response || !response.ok) {
                setInputValid(false);
                return;
            }
        }
        catch (error) {
            setServerError(true);
            console.error(error);
            return;
        }

        setInputDisabled(false);
        
        email.reset();
        password.reset();

        let responseData = await response.json();

        props.setPageState(pageStates.LOGGED_IN);
        props.setUser({ user: responseData.name, email: responseData.email, id: responseData.id });
        setInputValid(true);
        setServerError(false);

    }

    return (
        <div className="loginScreen">
            <form id="loginForm" className="loginForm" onSubmit={handleSubmit}>
                <h1>Welcome to Only Morten Fans</h1>
                <label><b>This is a fan side for our beloved saint Morten of Tours</b></label>
                <label><b>He is a true saint who protect us against the devil himself Goosifer</b></label>
                <br />
                <label><b>If you are not already a menber come join us</b></label>
                <label><b>And show your love and appreciation for his holy work</b></label>
                <br />
            {/* </form>
            <form id="loginForm" className="loginForm" onSubmit={handleSubmit}> */}
                {serverError ? <ErrorOccured text="Error from server, please try again later" /> : <></>}
                {inputValid ? <></> : <ErrorOccured text="Invalid email and/or password, make certain you entered the correct info and the user exists" />}
                <label className="loginLabel">Email:</label>
                <input {...email} className="loginInput" />
                <br />
                <EmailTooltip email={validEmail} />
                <br />
                <label className="loginLabel">Password:</label>
                <input {...password} type="password" className="loginInput" />
                <br />
                <PasswordTooltip small={containsSmallCharacter} capital={containsCapitalCharacter} number={containsNumber} isLong={isLongEnough} />
                <br />
                <button type="submit" disabled={inputDisabled || !validInputs()} className="loginButton">Login</button>
                <br />
                <button disabled={inputDisabled} className="loginButton" onClick={switchToCreateUser}>Create new user</button>
            </form>
        </ div>
    );

}

export function EmailTooltip(props) {

    return (
        <div className="tooltip">Email must have a valid format, eksample: eksample@email.com {props.email ? "✔️" : "❌"}</div>
    );
}

export function PasswordTooltip(props) {

    return (
        <>
            <div className="tooltip">Password must contain at least 1 small character {props.small ? "✔️" : "❌"}</div>
            <div className="tooltip">Password must contain at least 1 capital character {props.capital ? "✔️" : "❌"}</div>
            <div className="tooltip">Password must contain at least 1 number {props.number ? "✔️" : "❌"}</div>
            <div className="tooltip">Password must be at least 8 characters long {props.isLong ? "✔️" : "❌"}</div>
        </>
    );
}

export function ErrorOccured(props) {

    return (
        <>
            <br /><p className="warning" style={{ color: "red" }}>{props.text}</p>
        </>
    );

}