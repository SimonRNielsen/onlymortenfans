import React, { useState } from "react";
import { pageStates } from "./enums";
import { LoginScreen } from "./login";
import { CreateScreen } from "./createuser";
import "./styles.css"

export function MainPage() {

    const [pageState, setPageState] = useState(pageStates.NOT_LOGGED_IN);
    const [userInfo, setUser] = useState({ user: null, email: null });

    return(
        <>
            { pageState === pageStates.NOT_LOGGED_IN ? <LoginScreen setPageState={setPageState} setUser={setUser}/> : <></> }
            { pageState === pageStates.LOGGED_IN && userInfo.user !== null ? <h1>HOLY BOARD</h1> : <></> }
            { pageState === pageStates.CREATE_USER ? <CreateScreen setPageState={setPageState} setUser={setUser}/> : <></> }
        </>
    );

}