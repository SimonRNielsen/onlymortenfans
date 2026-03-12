import React from "react";
import { useInput } from "./hooks";

const loginURL = "https://reactapi-6jhi.onrender.com/api/users/login";

export function LoginScreen(props) {

    let name = useInput("");
    let password = useInput("");
    let inputDisabled = false;

    async function handleSubmit(event) {
        
        event.preventDefault();

        let loginDTO = {
            email: name.value,
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

        let responseData = await response.json();

        console.log(responseData);

        console.log("Input: " + name.value);
        console.log("Input: " + password.value);

    }

    function disableInput() {
        if (inputDisabled) return true;
        return false;

    }

    return(
        <>
        <form id="loginForm" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input {...name} />
            <br />
            <label>Password:</label>
            <input {...password}/>
            <br />
            <button type="submit" disabled={disableInput()}>Login</button>
        </form>
        <button disabled={disableInput()}>Create</button>
        </>
    );

}
