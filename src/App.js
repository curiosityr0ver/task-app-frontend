import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import AudioPlayer from './components/AudioPlayer';


import {
  Button, Box
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

  useEffect(() => {
    // console.log(turn);
    // console.log(playing);
  });


  return (
    <div className="App">
      <h1>Audio Player</h1>
      <FileUpload onFileUpload={handleFileUpload} count={count} setCount={setCount} />
      {audioUrl.map((audio, index) => <AudioPlayer audioUrl={audioUrl[index]} turn={turn} setTurn={setTurn} playing={playing} setPlaying={setPlaying} index={index} key={index} />)}
      <Button colorScheme='blue' onClick={() => { turn < 0 ? setTurn(0) : setPlaying(!playing); }}>Play</Button>
      <Button colorScheme='blue' onClick={() => setTurn(-20)}>Restart</Button>
    </div >
  );

}

export default App;
