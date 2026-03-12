import React, { useState } from "react";
import { pageStates } from "./enums";
import { LoginScreen } from "./login";
import "./styles.css"

export function MainPage() {

    const [pageState, setPageState] = useState(pageStates.NOT_LOGGED_IN);
    const [userInfo, setUser] = useState({ user: null, email: null});

    return(
        <>
            { pageState === pageStates.NOT_LOGGED_IN ? <LoginScreen setPageState={setPageState} setUser={setUser}/> : <></> }
            { pageState === pageStates.LOGGED_IN ? <h1>MANGLER</h1> : <></> }
            { pageState === pageStates.CREATE_USER ? <h1>OPRET BRUGER</h1> : <></> }
        </>
    );

}