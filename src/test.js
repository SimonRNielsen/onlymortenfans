import React from "react";
import { useInput } from "./hooks";

export function Test(props) {

    let input = useInput("");

    function clearInput() {
        input.value = "";
    }

    return (
        <>
            <h1>{input.value}</h1>
            <form>
                <input {...input} />
                <button type="submit" onClick={clearInput}>Test</button>
            </form>
        </>
    );

}