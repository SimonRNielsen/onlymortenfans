import ReactDOM from "react-dom/client";
import React from "react";
import { MainPage } from "./mainpage.js";
import "./styles.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div className="backgroundContainer">
        <MainPage />
    </div>
);