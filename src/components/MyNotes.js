import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import NewNoteModal from "./miscellaneous/NewNoteModal";
import { Button, IconButton } from "@chakra-ui/react";
import { NoteState } from "../context/NoteProvider";
import { Avatar } from "@chakra-ui/avatar";


const MyNotes = () => {

  const { selectedGroup, setSelectedGroup, notes, setNotes, user } = NoteState();

  const toast = useToast();

  const fetchTasks = async () => {
    // console.log(user._id);
    try {

      // const { data } = await axios.get("https://task-manager-backend-production-81bc.up.railway.app/api/task", config);
      const { data } = await axios.get("http://localhost:5000/api/note");
      setNotes(data);
      // console.log(data);
      // console.log([...new Set(data.map(note => note.group))]);
      // console.log(tasks);

    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Notes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const fetchGroups = () => {
    return [...new Set(notes.map(note => note.group))];
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box
      display={{ base: selectedGroup ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      py={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >

      Pocket Notes

      <Box
        display="flex"
        flexDir="column"
        py={3}
        w="100%"
        h="100%"
      >

        <Stack>
          {notes && fetchGroups().map((group, index) => {
            return (
              <Box
                display='flex'
                alignItems='center'
                gap="1rem"
                onClick={() => setSelectedGroup(group)}
                cursor="pointer"
                bg={selectedGroup === group ? "#EEEDEB" : "white"}
                // color={selectedGroup === group ? "white" : "black"}
                key={index}
              >
                <Avatar name={group} />
                <Text fontWeight='bold' fontSize='2xl'>
                  {group}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box w="100%" display="flex" p="10px" justifyContent="flex-end">
        <NewNoteModal >
          <IconButton
            // fontSize={"lg"}
            borderRadius={"3rem"}
            icon={<AddIcon />}
            height="3rem"
            width="3rem"
            backgroundColor="#001f8b"
            color="white"
          />
        </NewNoteModal>
      </Box>

    </Box>
  );
};

export default MyNotes;
