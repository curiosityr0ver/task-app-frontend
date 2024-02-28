import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { NoteState } from "../../context/NoteProvider";
import { transform } from "framer-motion";

const NewNoteModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [noteGroup, setNoteGroup] = useState();
    const [noteDescription, setNoteDescription] = useState("Hey");
    const [noteColor, setNoteColor] = useState();
    const toast = useToast();
    const { user, notes, setNotes } = NoteState();
    const colors = ["#b38bfa", "#ff79f2", "#43e6fc", "#f19576", "#0047ff", "#6691ff"];


    const handleSubmit = async () => {
        if (!noteGroup) {
            toast({
                title: "Please add note group name",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        // console.log(noteDescription, typeof (noteDescription));
        try {

            const processedGroup = noteGroup.split(" ").map(word => {
                return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
            });
            const { data } = await axios.post(

                `https://task-manager-backend-production-81bc.up.railway.app/api/note`,
                {
                    group: processedGroup.join(" "),
                    description: " ",
                    color: noteColor
                }
            );
            // console.log(data);
            setNotes([data, ...notes]);
            onClose();
            toast({
                title: "New Note Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Note!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent width="400px">
                    <ModalHeader
                        d="flex"
                        justifyContent="center"
                    >
                        Create New Group
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Box display="flex" alignItems='center'>
                                <FormLabel>Group Name</FormLabel>
                                <Input
                                    width="70%"
                                    placeholder="Enter Group Name"
                                    mb={3}
                                    borderRadius={"16px"}
                                    onChange={(e) => setNoteGroup(e.target.value)}
                                />
                            </Box>

                        </FormControl>
                        <Box display="flex" gap={"1px"}>
                            Choose Colour
                            <Box width="60%" display={"flex"} ml={"15px"} gap="8px">
                                {colors.map(color => {
                                    return (
                                        <Box key={color} onClick={() => { setNoteColor(color); }} bg={color} height="25px" width="25px" borderRadius="13px" _hover={{ transform: "scale(1.05)" }}>
                                            {/* hey */}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button backgroundColor={"#001f8b"} onClick={handleSubmit} colorScheme="blue">
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};

export default NewNoteModal;
