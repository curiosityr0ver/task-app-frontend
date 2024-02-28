import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import NewNoteModal from "./miscellaneous/NewNoteModal";
import { Button, IconButton } from "@chakra-ui/react";
import { NoteState } from "../context/NoteProvider";
import { Avatar } from "@chakra-ui/avatar";
import ScrollableFeed from 'react-scrollable-feed';

const MyNotes = () => {

  const { selectedGroup, setSelectedGroup, notes, setNotes, user } = NoteState();

  const toast = useToast();

  const fetchNotes = async () => {
    // console.log(user._id);
    try {
      const { data } = await axios.get("https://task-manager-backend-production-81bc.up.railway.app/api/note");
      // const { data } = await axios.get("http://localhost:5000/api/note");
      setNotes(data);
      // console.log(data);
      // console.log([...new Set(data.map(note => note.group))]);

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
    notes.forEach(note => {
      console.log(note.color);
    });
    const res = [...new Set(notes.map(note => note.group))];
    // res.forEach(r => {
    //   console.log(r);
    //   // console.log(notes.ge);
    // });
    return res;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      display={{ base: selectedGroup ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      py={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
    >
      <Text m="1rem" fontWeight='bold' fontSize='2xl'>
        Pocket Notes
      </Text>
      <Box
        display="flex"
        flexDir="column"
        py={3}
        w="100%"
        h="100%"
      >
        <ScrollableFeed>
          <Stack height="640px">
            {notes && fetchGroups().map((group, index) => {
              const currNote = notes.find(note => { return (group == note.group); });
              return (
                <Box
                  display='flex'
                  alignItems='center'
                  gap="1.5rem"
                  ml="60px"
                  mt="5px"
                  onClick={() => setSelectedGroup(group)}
                  cursor="pointer"
                  bg={selectedGroup === group ? "#EEEDEB" : "white"}
                  // color={selectedGroup === group ? "white" : "black"}
                  key={index}
                >
                  <Avatar name={group} bg={currNote.color} color={"white"} />
                  <Text fontWeight='bold' fontSize='xl'>
                    {group}
                  </Text>
                </Box>
              );
            })}
          </Stack>

        </ScrollableFeed>
        <Box position="absolute" right="78%" bottom="25px" w="100%" display="flex" p="10px" justifyContent="flex-end">
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
    </Box>
  );
};

export default MyNotes;
