import React from 'react';

const Music = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Your Music Title Here</h2>
      <p>Description or any other details about the music.</p>
      
      <audio controls>
        <source src="path_to_your_audio_file.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Music;
