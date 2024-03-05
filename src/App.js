import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import AudioPlayer2 from './components/AudioPlayer2';
// import SliderApp from './components/SliderApp';
import SliderApp from './components/SliderApp';

import { Button, ButtonGroup } from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(-1);
  const [duration, setDuration] = useState([]);
  const [audioUrl, setAudioUrl] = useState([]);
  const [values, setValues] = useState([]);
  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAudioUrl([...audioUrl, url]);
  };

  useEffect(() => {
    // console.log(turn);
    // console.log(duration);
  }, [duration]);
  useEffect(() => {
    // console.log(turn);
    // console.log(values);
    const arrayOfPairs = [];
    arrayOfPairs.push([0, values[0]]);
    for (let i = 1; i < values.length; i++) {
      // if (values[i] - values[i - 1] > duration[i]) {
      //   alert("time range out of bound for given audio file");
      // }
      arrayOfPairs.push([values[i - 1], values[i]]);
    }
    if (count > 1) arrayOfPairs.push([values[values.length - 1], values[values.length - 1] + (values[1] - values[0])]);

    // console.log(arrayOfPairs);

  }, [values]);

  return (
    <div className="App">
      <h1>Audio Player</h1>
      <FileUpload onFileUpload={handleFileUpload} duration={duration} setDuration={setDuration} count={count} setCount={setCount} />
      {audioUrl.map((audio, index) => <AudioPlayer2 audioUrl={audioUrl[index]} turn={turn} setTurn={setTurn} index={index} key={index} />)}
      {count > 0 && <SliderApp duration={duration} count={count} setCount={setCount} finValues={values} setFinValues={setValues} />}
      <Button colorScheme='blue' onClick={() => { turn < 0 ? setTurn(0) : setTurn(turn * 1); }}>Play</Button>
      <br />
      {/* <Button colorScheme='red' onClick={() => setCount(count + 1)}>Count +</Button>
      <Button colorScheme='green' onClick={() => setCount(count - 1)}>Count -</Button> */}

    </div >
  );
}

export default App;
