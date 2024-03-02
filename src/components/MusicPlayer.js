import React from 'react';
import AudioPlayer from 'react-audio-player';


function MusicPlayer({ audioFile }) {
    return (
        <div>
            <AudioPlayer
                src="my-audio-file.mp3"
                onPlay={(e) => console.log(e)}
            />
        </div>
    );
}

export default MusicPlayer;