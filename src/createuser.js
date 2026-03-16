import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"
import { EmailTooltip, PasswordTooltip } from "./login";
import { create } from "./api/api";

const createURL = "https://reactapi-6jhi.onrender.com/api/users/create";

export function CreateScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDiabled] = useState(false);
    let name = useInput("");

    // let validName = / /.test(name.value) && name.length < 2;

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

    return (
        <div className="loginScreen">
            <form id="loginForm" className ="loginForm" onSubmit={handleSubmit}>
                <label className="loginLabel">Name:</label>
                <input {...name} className="loginInput" />
                <br />
                {TooltipUsername(name.value)}
                 <br />
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
                <button disabled={inputDisabled} className="loginButton" onClick={switchToLogin}>Back to login</button>
            </form>
        </ div>
    );

    function switchToLogin() {
        props.setPageState(pageStates.NOT_LOGGED_IN);
    }

    function TooltipUsername(username) {
        let working;
        if (/ /.test(username) || username.length < 2) {
            working = false;
        }
        else {
            working = true;
        }

        return <div className="tooltip">Username must have a valid format, eksample: martin or saint92 {working ? "✔️" : "❌"}</div>
    }

    async function handleSubmit(event) {
        event.preventDefault(); //Ellers refresher submit hjemmesiden
        setInputDiabled(true);

        let createUserDTO = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        let response;

        try {
            response = await create(createUserDTO);
        }
        catch (error) {
            console.log(error);
            return;
        }
        finally {
            setInputDiabled(false);

            if (!response.ok) {
                return;
            }

            name.value = "";
            email.value = "";
            password.value = "";
        }

        let responseData = await response.json();

        props.setPageState(pageStates.LOGGED_IN);
        props.setUser({
            user: responseData.name,
            email: responseData.email,
            id: responseData.id
        })
    }

}