import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import AudioPlayer from './components/AudioPlayer';
import SliderApp from './components/SliderApp';

function App() {
  const [turn, setTurn] = useState(0);
  const [audioUrl, setAudioUrl] = useState([]);

  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAudioUrl([...audioUrl, url]);
  };

  useEffect(() => {
    console.log(turn);
  }, [turn]);


  return (
    <div className="App">
      <h1>Audio Player</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {audioUrl.map(function (audio, index) {
        return (
          <AudioPlayer audioUrl={audio} turn={turn} setTurn={setTurn} index={index} key={index} />
        );
      })}
      {/* <SliderApp /> */}
    </div >
  );
}

export default App;
