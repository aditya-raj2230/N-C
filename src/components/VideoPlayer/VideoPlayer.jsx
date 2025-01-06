import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import for routing
import { Volume2, VolumeX, Maximize } from "lucide-react";
import { projects } from "../../pages/Home/projects";
import "./VideoPlayer.css";

const VideoPlayer = ({ staticVideoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const videoRef = useRef(null);

  const { id } = useParams(); // Get the project id from the URL
  const navigate = useNavigate();
  const projectIndex = projects.findIndex((project) => project.id === parseInt(id));
  const project = projects[projectIndex]; // Get the current project
  const nextProject = projects[(projectIndex + 1) % projects.length]; // Get the next project, loop back to the start if at the end

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video when the src changes
      videoRef.current.muted = true;
      videoRef.current.play();
      setIsPlaying(true);
      setFirstClick(true); // Reset first click behavior for new video
    }
  }, [projectIndex]); // Trigger when projectIndex changes

  const handleVideoClick = () => {
    if (firstClick) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowControls(true);
      setFirstClick(false);
    } else {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const toggleFullScreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNextProject = () => {
    navigate(`/work/${nextProject.id}`);
  };

  const videoSrc = project?.videoUrl || staticVideoUrl; // Use project video URL or fallback to static URL

  return (
    <div className="video-container" onClick={handleVideoClick}>
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            className="video-player"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(videoRef.current.duration)}
            src={videoSrc}
            autoPlay
            loop
            playsInline
            onError={() => console.error("Failed to load video. Check the source URL.")} // Log the error for debugging
          >
            Your browser does not support the video tag.
          </video>

          {showControls && (
            <div className="video-controls">
              <div className="controls-wrapper">
                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <div className="control-buttons">
                  <button onClick={toggleMute} className="control-button">
                    {isMuted ? <VolumeX className="icon" /> : <Volume2 className="icon" />}
                  </button>

                  <button onClick={toggleFullScreen} className="control-button">
                    <Maximize className="icon" />
                  </button>
                </div>
              </div>
            </div>
          )}

     
        </>
      ) : (
        <p>Video not available</p>
      )}
    </div>
  );
};

export default VideoPlayer;
