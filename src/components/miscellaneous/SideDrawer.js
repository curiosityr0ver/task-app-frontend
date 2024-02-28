import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import axios from "axios";

import {
    Menu,
    MenuButton,
    // MenuDivider,
    // MenuItem,
    // MenuList,
} from "@chakra-ui/menu";

import TaskListItem from "../userAvatar/TaskListItem";

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { NoteState } from "../../context/NoteProvider";
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { selectedGroup, setSelectedGroup, user } = NoteState();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history('/');
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`https://task-manager-backend-production-81bc.up.railway.app/api/task?search=${search}`, config);
            // console.log(data);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    };

    const accessTask = async (taskId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`https://task-manager-backend-production-81bc.up.railway.app/api/task${taskId}`, config);

            setSelectedGroup(data);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the task",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    };

    return (
        <Box
            bg="#001f8b"
            color="white"
            width="100%"
            height="4rem"
            padding="5px"
            display='flex'
            gap="20px"
            alignItems="center"
        >
            <Avatar name={selectedGroup} />
            <Text>
                {selectedGroup}
            </Text>
        </Box >
    );
};

export default SideDrawer;