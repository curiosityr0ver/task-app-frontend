import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import NewTaskModal from "./miscellaneous/NewTaskModal";
import { Button, IconButton } from "@chakra-ui/react";
import { NoteState } from "../context/NoteProvider";

const MyNotes = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

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
        description: "Failed to Load the notes",
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
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >

      Pocket Notes

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
      >

        <Stack overflowY="scroll">
          {notes && fetchGroups().map((group, index) => {
            return (
              <Box
                onClick={() => setSelectedGroup(group)}
                cursor="pointer"
                bg={selectedGroup === group ? "#38B2AC" : "#E8E8E8"}
                color={selectedGroup === group ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={index}
              >
                <Text>
                  {group}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <NewTaskModal >
        <IconButton
          // fontSize={"lg"}
          borderRadius={"20px"}
          icon={<AddIcon />}
          colorScheme="blue"
        />
      </NewTaskModal>
    </Box>
  );
};

export default MyNotes;
