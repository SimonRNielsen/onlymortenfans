import React, { useState } from "react";
import { useInput } from "./hooks";

const loginURL = "https://reactapi-6jhi.onrender.com/api/users/login";

export function LoginScreen(props) {

    let email = useInput("");
    let password = useInput("");
    let [inputDisabled, setInputDiabled] = useState(false);

    function validateInputs() {

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && password.value.length >= 8) {
            return false;
        }

        return true;

    }

    async function handleSubmit(event) {

        setInputDiabled(true);
        
        event.preventDefault();

        let loginDTO = {
            email: email.value,
            password: password.value
        }

        email.value = "";
        password.value = "";

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
            if (!response.ok)
                return;
        }

        let responseData = await response.json();

        console.log(responseData);

        console.log("Input: " + email.value);
        console.log("Input: " + password.value);

    }

    return(
        <>
        <form id="loginForm" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input {...email} />
            <br />
            <label>Password:</label>
            <input {...password} type="password" />
            <br />
            <button type="submit" disabled={inputDisabled || validateInputs()}>Login</button>
        </form>
        <button disabled={inputDisabled}>Create</button>
        </>
    );

}
