import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"

const loginURL = "https://reactapi-6jhi.onrender.com/api/users/login";

export function LoginScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDisabled] = useState(false);
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

        if (validEmail && validPassword) { 
            return true;
        }

        return false;

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

            response = await fetch(loginURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginDTO)
            });

        }
        catch (error) {
            console.error(error);
        }
        finally {
            setInputDisabled(false);

            if (!response.ok) {

                //Fejlet login feedback!

                return;
            }

            email.value = "";
            password.value = "";
        }

        let responseData = await response.json();

        props.setPageState(pageStates.LOGGED_IN);
        props.setUser({ user: responseData.name, email: responseData.email, id: responseData.id });

    }

    return (
        <div className="loginScreen">
            <form id="loginForm" onSubmit={handleSubmit}>
                <label className="loginLabel">Email:</label>
                <input {...email} className="loginInput" />
                <br />
                <EmailTooltip email={validEmail}/>
                <label className="loginLabel">Password:</label>
                <input {...password} type="password" className="loginInput" />
                <br />
                <PasswordTooltip small={containsSmallCharacter} capital={containsCapitalCharacter} number={containsNumber} isLong={isLongEnough}/>
                <button type="submit" disabled={inputDisabled || !validInputs()} className="loginButton">Login</button>
            </form>
            <button disabled={inputDisabled} className="loginButton" onClick={switchToCreateUser}>Create new user</button>
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