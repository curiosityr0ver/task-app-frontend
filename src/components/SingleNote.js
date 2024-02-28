import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { FormControl, Container, Input, InputGroup, InputRightAddon, Textarea, useToast, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Heading, Badge, Button } from '@chakra-ui/react';
import UpdateTaskModal from "./miscellaneous/UpdateTaskModal";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed';
import { IoSend } from "react-icons/io5";


import { NoteState } from "../context/NoteProvider";


const SingleNote = ({ fetchAgain, setFetchAgain }) => {
  // const [socketConnected, setSocketConnected] = useState(false);
  const [note, setNote] = useState();
  const toast = useToast();
  const { user, notes, setNotes, selectedGroup, setSelectedGroup } = NoteState();
  // console.log(selectedGroup);

  useEffect(() => {

    // console.log(note);
  }, [note]);

  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:5000/api/note", {
      group: selectedGroup,
      description: note
    });
    setNotes([data, ...notes]);
  };


  const processDate = (createdAt) => {
    return [
      new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      " • ",

      new Date(createdAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    ];
  };

  return selectedGroup ? (
    <Box
      width="100%"
    // overflowY="hidden"
    >
      <Box
        p="10px 18px"
        maxH="490px"
      >
        <ScrollableFeed>
          {notes.map((note, index) => {
            if (note.group == selectedGroup) return (
              <Box
                key={index}
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px;'
                borderRadius="5px"
                p="20px"
                m="10px"
                mb="20px"
                bg="white"
              >
                <Text> {note.description}</Text>
                <br />
                <Text fontWeight="bold" align={"right"}>{processDate(note.createdAt)}</Text>
              </Box>
            );
          }
          )}
        </ScrollableFeed >
      </Box>
      <Box display="flex" flexDir="column" backgroundColor="#001f8b" p="15px 20px">
        <Box backgroundColor="white" borderRadius="md">
          <FormControl>
            <Textarea
              value={note}
              onChange={(e) => { setNote(e.target.value); }}
              height="110px"
              backgroundColor="white"
              border="none"
              outline="none"
              _focus={{ boxShadow: "none" }}
              placeholder="Enter your text here..."
              resize="none"
            />
          </FormControl>
          <Box display="flex" flexDir="row" justifyContent="flex-end" width="100%" p="10px 20px">
            <Icon color="gray" onClick={handleSubmit} fontSize="2xl" as={IoSend}>
            </Icon>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Text fontSize="xx-large" color="gray.700" mb={2}>
      Select A Group
    </Text>
  );
};

export default SingleNote;
