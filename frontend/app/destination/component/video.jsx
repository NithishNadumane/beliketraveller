import React from 'react';

const Video = () => {
  const videoId = "2clcTLPNdfg";
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        aspectRatio: '16 / 9',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <img
        src={thumbnail}
        alt="YouTube Thumbnail"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <img
        src="https://www.freeiconspng.com/uploads/youtube-play-button-transparent-png-9.png"
        alt="Play Button"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80px',
          transform: 'translate(-50%, -50%)',
          opacity: 0.8,
        }}
      />
    </a>
  );
};

export default Video;
