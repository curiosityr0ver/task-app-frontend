import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [selectedGroup, setSelectedGroup] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [notes, setNotes] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            navigate("/");
            setNotes([]);
        } else {
            setUser(userInfo);
        }
        // console.log(userInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NoteContext.Provider
            value={{
                selectedGroup,
                setSelectedGroup,
                user,
                setUser,
                notification,
                setNotification,
                notes,
                setNotes
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

export const NoteState = () => {
    return useContext(NoteContext);
};

export default NoteProvider;
