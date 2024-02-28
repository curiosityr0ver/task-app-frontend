import { Box } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import Notebox from "../components/NoteBox";
import MyNotes from "../components/MyNotes";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { NoteState } from "../context/NoteProvider";

const Notepage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    const { user, setUser, selectedNote } = NoteState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            {/* {selectedNote && <SideDrawer />} */}
            <Box display='flex' justifyContent='space-between' w='100%' h={'100vh'}>
                {user && <MyNotes fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <Notebox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    );
};

export default Notepage;
