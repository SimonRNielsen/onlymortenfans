import ReactDOM from "react-dom/client";
import React from "react";
import { Test } from "./test.js";
import { LoginScreen } from "./login.js";
import "./styles.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div className="backgroundContainer">
        {/* <Test /> */}
        <LoginScreen />
    </div>
);