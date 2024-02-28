import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleNote from "./SingleNote";
import { NoteState } from "../context/NoteProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";


const Notebox = () => {
  const { selectedGroup } = NoteState();
  // console.log(selectedGroup);
  // console.log(selectedGroup);

  return (
    <Box
      display={{ base: selectedGroup ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      backgroundColor="#d9e4f4"
      w="100%"
    >
      {selectedGroup && <SideDrawer />}
      <SingleNote />
    </Box>
  );
};

export default Notebox;
