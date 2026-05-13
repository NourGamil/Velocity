const VideoBackground = () => {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="
        absolute top-0 left-0 
        w-full h-[100dvh] 
        object-cover 
        z-[-1]
        max-sm:left-1/2 max-sm:-translate-x-1/2
      "
    >
      <source src="images/1.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoBackground;