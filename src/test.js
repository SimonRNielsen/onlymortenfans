import React from "react";
import sexymorten from "./sexymorten.jpg";
import { useInput } from "./hooks";

export function Test(props) {

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let input = useInput("Hej");

    return (
        <>
            <input {...input}/>
            <img width={windowWidth} height={windowHeight} src={sexymorten} />
        </>
    );

}