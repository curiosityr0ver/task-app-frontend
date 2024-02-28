import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { FormControl, Textarea, useToast, Icon, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed';


import { NoteState } from "../context/NoteProvider";


const SingleNote = ({ fetchAgain, setFetchAgain }) => {
  // const [socketConnected, setSocketConnected] = useState(false);
  const [note, setNote] = useState();
  const toast = useToast();
  const { notes, setNotes, selectedGroup } = NoteState();
  // console.log(selectedGroup);

  useEffect(() => {

    // console.log(note);
  }, [note]);

  const handleSubmit = async () => {

    if (!note) return;
    const { data } = await axios.post("https://task-manager-backend-production-81bc.up.railway.app/api/note", {
      group: selectedGroup,
      description: note
    });
    setNotes([...notes, data]);
    setNote("");
    // console.log(note);
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
            if (note.group == selectedGroup && note.description != "") return (
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
      <Box display="flex" flexDir="column" width="76.5%" position="absolute" bottom="0px" backgroundColor="#001f8b" p="15px 20px">
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
            <Icon color={note ? "black" : " gray"} _hover={note && { transform: "scale(1.1)" }} onClick={handleSubmit} fontSize="2xl" as={IoSend}>
            </Icon>
          </Box>
        </Box>
      </Box>
    </Box >
  ) : (
    <Box mt="15%" display="flex" flexDir="column" alignItems="center">
      <Image src={require("../assets/corporate_art_memphis.png")} alt='Corporate Art' />

      <Text fontWeight="bold" fontSize="xx-large" mb={2}>
        Pocket Notes
      </Text>
      <Text fontWeight="bold" mb={2}>
        Send and receive messages without keeping your phone online.
      </Text>
      <Text fontWeight="bold">
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </Text>


      <Box mt="150px" display="flex" alignItems="center">
        <Icon fontSize="xl" as={IoMdLock} />
        <Text>
          end-to-end encrypted
        </Text>
      </Box>
    </Box>

  );
};

export default SingleNote;
