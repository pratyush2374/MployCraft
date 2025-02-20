"use client";

import { useState } from "react";
import BasicDetails from "./BasicDetails";
import UserInputNavbar from "./UserInputNavbar";
import EduAndExp from "./EduAndExp";

const UserInput = () => {
    const [tab, setTab] = useState<number>(2)
    return (
        <>
            <UserInputNavbar />
            {tab == 1 && <BasicDetails setTab={setTab}/>}
            {tab == 2 && <EduAndExp setTab={setTab}/>}
            
        </>
    );
};

export default UserInput;
