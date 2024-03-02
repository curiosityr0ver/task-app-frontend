import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import AudioPlayer from './components/AudioPlayer';
import SliderApp from './components/SliderApp';
import { Button, ButtonGroup } from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(-1);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState([]);
  const [values, setValues] = useState([]);
  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAudioUrl([...audioUrl, url]);
  };

  // useEffect(() => {
  //   // console.log(turn);
  //   console.log(duration);
  // }, [duration]);
  useEffect(() => {
    // console.log(turn);
    console.log(values);
    const arrayOfPairs = [];

    for (let i = 1; i < values.length; i++) {
      arrayOfPairs.push([values[i - 1], values[i]]);
    }
    console.log(arrayOfPairs);

  }, [values]);

  return (
    <div className="App">
      <h1>Audio Player</h1>
      <FileUpload onFileUpload={handleFileUpload} duration={duration} setDuration={setDuration} count={count} setCount={setCount} />
      {audioUrl.map((audio, index) => <AudioPlayer audioUrl={audioUrl[index]} turn={turn} setTurn={setTurn} index={index} key={index} />)}
      <SliderApp duration={duration} count={3} setCount={setCount} values={values} setValues={setValues} />
      <Button colorScheme='blue' onClick={() => { setTurn(0); }}>Play</Button>
    </div >
  );
}

export default App;
