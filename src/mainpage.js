import React, { useState } from "react";
import { pageStates } from "./enums";
import { LoginScreen } from "./login";
import { HolyBoard } from "./holyboard";
import "./styles.css"

export function MainPage() {

    const [pageState, setPageState] = useState(pageStates.NOT_LOGGED_IN);
    const [userInfo, setUser] = useState({ user: null, email: null, id: null });

    return(
        <>
            { pageState === pageStates.NOT_LOGGED_IN ? <LoginScreen setPageState={setPageState} setUser={setUser}/> : <></> }
            { pageState === pageStates.LOGGED_IN && userInfo.user !== null ? <HolyBoard /> : <></> }
            { pageState === pageStates.CREATE_USER ? <h1>OPRET BRUGER</h1> : <></> } {/* */}
        </>
    );

}