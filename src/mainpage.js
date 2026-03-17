import React, { useState } from "react";
import { pageStates } from "./enums";
import { LoginScreen } from "./login";
import { HolyWhiteboard } from "./holywhiteboard";
import { CreateScreen } from "./createuser";
import "./styles.css"

export function MainPage() {

    const [pageState, setPageState] = useState(pageStates.NOT_LOGGED_IN);
    const [userInfo, setUser] = useState({ user: null, email: null, id: null });

    return (

        //3 koloner

        <div className="row">
            <div className="column" id="leftColumn"></div>
            <div className="column" id="middleColumn">
                <>
                    {pageState === pageStates.NOT_LOGGED_IN ? <LoginScreen setPageState={setPageState} setUser={setUser} /> : <></>}
                    {pageState === pageStates.LOGGED_IN ? <HolyWhiteboard setPageState={setPageState} setUser={setUser} userInfo={userInfo} /> : <></>}
                    {pageState === pageStates.CREATE_USER ? <CreateScreen setPageState={setPageState} setUser={setUser} /> : <></>}
                </>

            </div>
            <div className="column" id="rightColumn"></div>
        </div>
    );

}