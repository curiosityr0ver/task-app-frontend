import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import AudioPlayer from './components/AudioPlayer';


import {
  Button, Box, Text
} from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState([]);
  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAudioUrl([...audioUrl, url]);
  };
  const handleFileDelete = (index) => {
    setAudioUrl([...audioUrl.filter((_, i) => i !== index)]);
  };

  useEffect(() => {
    if (turn == audioUrl.length) {
      setTurn(-1);
    }
  });


  return (
    <div>
      <Box width={"100%"} minH="100vh" p={"20px"} bg={"gray"} >
        <Box display={"flex"} flexDir={"column"} bg={"lightgray"} alignItems={"center"} gap={"10px"} minH="100vh" p={"25px"} borderRadius="10px">
          {/* <BoxlexDir={"column"}   width={"100%"}   */}
          <Box width={"100%"} display={"flex"} flexDir={"row"} justifyContent={"space-around"}>
            <Text fontSize={"7xl"} fontFamily={"Kode Mono"} fontWeight={"bold"}> &#123; Audio Mixer Pro &#125; </Text>
            <FileUpload onFileUpload={handleFileUpload} handleFileDelete={handleFileDelete} count={count} setCount={setCount} />
          </Box>


          <Box width={"100%"} bg={"#EEEDEB"} borderRadius={"md"}>
            {audioUrl.map((audio, index) => <AudioPlayer audioUrl={audioUrl[index]} turn={turn} setTurn={setTurn} playing={playing} setPlaying={setPlaying} index={index} key={index} />)}

          </Box>
          <Box w="25%" display={"flex"} justifyContent={"space-between"}>
            <Button colorScheme='blue' onClick={() => { turn < 0 ? setTurn(0) : setPlaying(!playing); }}>{playing ? "Pause" : "Play"}</Button>
            <Button colorScheme='red' onClick={() => setTurn(-20)}>Restart</Button>
          </Box>

        </Box>

      </Box>


    </div>




  );

};

export default App;
