import React from "react";
import { useInput } from "./hooks";

export function LoginScreen(props) {

    let name = useInput("");
    let password = useInput("");

    function submitInfo(event) {
        event.preventDefault();
        console.log(name);
        console.log(password);
    }

    return(
        <>
        <form id="loginForm">
            <label>Name:</label>
            <input {...name}/>
            <br />
            <label>Password:</label>
            <input {...password}/>
            <br />
            <button type="submit" onClick={submitInfo}>Login</button>
        </form>
        <button>create</button>
        </>
    );

}