import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Move, ChevronUp, ChevronDown, Music } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef(null);
  const audioContextRef = useRef(null);

  // Music tracks configuration
  const tracks = [


    {
      title: "Glorious",
      artist: "",
      file: "/music/Glorious.mp3",
      duration: "3:40",
      previewDuration: 180
    },
    {
      title: "forver-young",
      artist: "ALPHAVILLE",
      file: "/music/forever-young.mp3",
      duration: "3:45",
      previewDuration: 180
    },
    {
      title: "Waiting for Love",
      artist: "Avicci",
      file: "/music/Waiting for Love.mp3",
      duration: "3:56",
      previewDuration: 30
    },
    {
      title: "Anxiety",
      artist: "Doechii",
      file: "/music/Anxiety.mp3",
      duration: "4:09",
      previewDuration: 20
    },

    {
      title: "Black and Yellow",
      artist: "",
      file: "/music/Black and Yellow.mp3",
      duration: "3:38",
      previewDuration: 60
    },
    {
      title: "cough_odo_",
      artist: "remix",
      file: "/music/cough_odo_.mp3",
      duration: "6:59",
      previewDuration: 30
    },
    {
      title: "shanghai Beach",
      artist: "Frances yip",
      file: "/music/shanghai Beach.mp3",
      duration: "3:14",
      previewDuration: 60
    }
    // Add more tracks here by following this format:
    // {
    //   title: "Your Track Name",
    //   artist: "Artist Name",
    //   file: "/music/your-track.mp3",
    //   duration: "4:20",
    //   previewDuration: 30
    // }
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Auto-play music on component mount with robust fallback
  useEffect(() => {
    const playAudio = async () => {
      if (!audioRef.current) return;

      try {
        // Try to play immediately
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction:", err);
        setIsPlaying(false);

        // If blocked, add one-time listener for any user interaction
        const enableAudio = async () => {
          if (audioRef.current) {
            try {
              // Initialize AudioContext if needed (for mobile)
              if (!audioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                  audioContextRef.current = new AudioContext();
                  audioContextRef.current.resume();
                }
              }

              await audioRef.current.play();
              setIsPlaying(true);

              // Remove listeners once successful
              ['click', 'touchstart', 'keydown'].forEach(event =>
                document.removeEventListener(event, enableAudio, { capture: true })
              );
            } catch (playErr) {
              console.log("Play on interaction failed:", playErr);
            }
          }
        };

        // Capture events in the capture phase to ensure we catch them early
        ['click', 'touchstart', 'keydown'].forEach(event =>
          document.addEventListener(event, enableAudio, { once: true, capture: true })
        );
      }
    };

    playAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Initialize audio context for mobile browsers
  const initializeAudio = () => {
    if (audioInitialized) return;

    try {
      // Create and resume audio context for mobile
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        audioContextRef.current.resume();
      }

      // Load audio element
      if (audioRef.current) {
        audioRef.current.load();
        setAudioInitialized(true);
      }
    } catch (err) {
      console.log('Audio initialization failed:', err);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      // Resume AudioContext if suspended (common in some browsers)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log('Playback toggle failed:', err);
      setIsPlaying(false);
    }
  };

  const switchTrack = (index) => {
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrackIndex(index);

    // Auto-play new track if previous was playing
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        try {
          audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log('Auto-play failed, user interaction required:', err);
        }
      }
    }, 100);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    switchTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    switchTrack(prevIndex);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Mobile-optimized touch handlers - immediate response
  const handlePlayPause = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Initialize audio in background if needed, but don't wait
    if (!audioInitialized) {
      initializeAudio(); // Don't await - let it run in background
    }

    // Immediate toggle for better UX - no async
    togglePlay();
  };

  const handlePrevTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    prevTrack();
  };

  const handleNextTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextTrack();
  };

  const handleMuteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMute();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.control-button') || e.target.closest('.volume-slider')) {
      return; // Don't start dragging if clicking on controls
    }

    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.control-button') || e.target.closest('.volume-slider') || e.target.closest('.track-item')) {
      return;
    }

    const touch = e.touches[0];
    touchStartPos.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    // Keep player within viewport bounds
    const maxX = window.innerWidth - 280; // player width
    const maxY = window.innerHeight - 120; // player height

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;

        const maxX = window.innerWidth - 280;
        const maxY = window.innerHeight - 120;

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      };

      const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const newX = touch.clientX - touchStartPos.current.x;
        const newY = touch.clientY - touchStartPos.current.y;

        const maxX = window.innerWidth - 280;
        const maxY = window.innerHeight - 120;

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Stop playback after preview duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const defaultPreview = 30;
      const preview = currentTrack.previewDuration ?? defaultPreview;
      if (preview && audio.currentTime >= preview) {
        nextTrack(); // Move to next track automatically after preview
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack, isPlaying]);

  return (
    <div
      ref={playerRef}
      className={`music-player ${isDragging ? 'dragging' : ''} ${isExpanded ? 'expanded' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <audio
        ref={audioRef}
        loop={false}
        onEnded={() => {
          setIsPlaying(false);
          if (tracks.length > 1) {
            nextTrack();
          }
        }}
        key={currentTrackIndex}
        preload="auto"
        crossOrigin="anonymous" // Help with mobile CORS issues
      >
        <source src={currentTrack.file} type="audio/mpeg" />
      </audio>

      <div className="player-header">
        <div className="drag-handle" title="Drag to move">
          <Move size={16} />
        </div>
        <div className="player-info">
          <span className="player-text">{currentTrack.title}</span>
          <span className="artist-text">{currentTrack.artist}</span>
          {!isPlaying && (
            <span className="instruction-text">Tap to play music</span>
          )}
          {isPlaying && (
            <span className="instruction-text">press to stop music</span>
          )}
        </div>
        <div className="header-controls">
          {tracks.length > 1 && (
            <button
              className="track-list-button"
              onClick={() => setShowTrackList(!showTrackList)}
              title="Show tracks"
            >
              <Music size={16} />
            </button>
          )}
          <button
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Expand/Collapse"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      <div className="player-controls">
        <button
          className="control-button main-control"
          onClick={handlePlayPause}
          onTouchStart={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {isExpanded && (
          <>
            {tracks.length > 1 && (
              <div className="track-controls">
                <button
                  className="control-button track-button"
                  onClick={handlePrevTrack}
                  onTouchStart={handlePrevTrack}
                  title="Previous track"
                >
                  <ChevronUp size={16} />
                </button>
                <span className="track-info">
                  {currentTrackIndex + 1}/{tracks.length}
                </span>
                <button
                  className="control-button track-button"
                  onClick={handleNextTrack}
                  onTouchStart={handleNextTrack}
                  title="Next track"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            )}

            <div className="volume-control expanded">
              <button
                className="control-button"
                onClick={handleMuteToggle}
                onTouchStart={handleMuteToggle}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span className="volume-percentage">{Math.round(volume * 100)}%</span>
            </div>
          </>
        )}
      </div>

      {showTrackList && tracks.length > 1 && (
        <div className="track-list">
          <div className="track-list-header">Playlist</div>
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`track-item ${index === currentTrackIndex ? 'active' : ''}`}
              onClick={() => {
                switchTrack(index);
                setShowTrackList(false);
              }}
            >
              <div className="track-item-info">
                <span className="track-title">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
              <span className="track-duration">{track.duration}</span>
            </div>
          ))}
        </div>
      )}

      {showVolumeTooltip && (
        <div className="volume-tooltip">
          Volume: {Math.round(volume * 100)}%
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
