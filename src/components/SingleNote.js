import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { FormControl, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Heading, Badge, Button } from '@chakra-ui/react';
import UpdateTaskModal from "./miscellaneous/UpdateTaskModal";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed';

// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { NoteState } from "../context/NoteProvider";
// const ENDPOINT = "http://localhost:5000"; (for local machine, also change is server.js)
// const ENDPOINT = "https://custom-mern-chat-app-production.onrender.com";

// "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;

const SingleNote = ({ fetchAgain, setFetchAgain }) => {
  // const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();


  const { user, notes, setNotes, selectedGroup, setSelectedGroup } = NoteState();
  // console.log(selectedGroup);

  const handleDelete = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // return console.log(selectedTask._id);
      const { data } = await axios.delete(
        `https://task-manager-backend-production-81bc.up.railway.app/api/task/${selectedGroup._id}`,
        config
      );

      const index = notes.indexOf(selectedGroup);
      notes.splice(index, 1);
      setNotes([...notes]);
      setSelectedGroup(null);

      toast({
        title: "Note Deleted !",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Delete the Note!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
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
    >
      <Box p="10px 18px"
        overflowY="hidden">
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
      <Box backgroundColor="#001f8b" p="20px" pos="sticky" bottom="0px">
        <FormControl>
          <Input
            variant="filled"
            placeholder="Enter a message.. (press Win + . (period) to send emojis)"
          // value={newMessage}
          // onChange={typingHandler}
          />
        </FormControl>
      </Box>

    </Box>


    // <Box
    //   display={{ base: "flex" }}
    //   alignItems="center"
    //   flexDir="column"
    //   p={3}
    //   bg="white"
    //   w={"100%"}
    //   borderRadius="lg"
    //   borderWidth="1px"
    // >
    //   <Text fontSize="xx-large" color="gray.500" mb={2}>
    //     {selectedGroup.description}
    //   </Text>
    //   <Text fontSize="xx-large" color="gray.700" mb={2}>
    //     Deadline: {new Date(selectedGroup.createdAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })}
    //   </Text>
    //   <Badge fontSize="xl" colorScheme={selectedGroup.status ? 'green' : 'red'}>
    //     {selectedGroup.status ? "Finished" : "Unfinished"}
    //   </Badge>

    //   <Box width={"45%"} display={"flex"} justifyContent="space-evenly" p="5px 10px">
    //     {/* <UpdateTaskModal selectedTask={selectedNote} fetchAgain={fetchAgain}>
    //       <Button variant="outline" leftIcon={<EditIcon />} colorScheme='teal' size='lg'>
    //         Edit
    //       </Button>
    //     </UpdateTaskModal> */}

    //     <Button onClick={handleDelete} leftIcon={<DeleteIcon />} colorScheme='red' size='lg'>
    //       Delete
    //     </Button>
    //   </Box>
    // </Box>

  ) : (
    <Text fontSize="xx-large" color="gray.700" mb={2}>
      Select A Task
    </Text>
  );
};

export default SingleNote;
