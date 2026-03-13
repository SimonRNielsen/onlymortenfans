import React, { useState } from "react";
import { useInput } from "./hooks";
import { pageStates } from "./enums";
import "./styles.css"

const loginURL = "https://reactapi-6jhi.onrender.com/api/users/login";

export function LoginScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDiabled] = useState(false);

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

    function switchToCreateUser() {
        props.setPageState(pageStates.CREATE_USER);
    }

    async function handleSubmit(event) {

        event.preventDefault(); //Ellers refresher submit hjemmesiden
        setInputDiabled(true);

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
            setInputDiabled(false);

            if (!response.ok) {
                return;
            }

            email.value = "";
            password.value = "";
        }

        let responseData = await response.json();

        props.setPageState(pageStates.LOGGED_IN);
        props.setUser({ user: responseData.name, email: responseData.email });

    }

    return (
        <div className="loginScreen">
            <form id="loginForm" onSubmit={handleSubmit}>
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
            <button disabled={inputDisabled} className="loginButton" onClick={switchToCreateUser}>Create new user</button>
        </ div>
    );

}
