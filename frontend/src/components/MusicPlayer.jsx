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
      title: "Background Music",
      artist: "Portfolio Theme",
      file: "/music/background.mp3",
      duration: "3:45"
    },
    {
      title: "Waiting for Love",
      artist: "Portfolio Theme", 
      file: "/music/Waiting for Love.mp3",
      duration: "3:56"
    },
    {
      title: "Anxiety",
      artist: "Portfolio Theme",
      file: "/music/Anxiety.mp3", 
      duration: "4:20"
    },
    // Add more tracks here by following this format:
    // {
    //   title: "Your Track Name",
    //   artist: "Artist Name",
    //   file: "/music/your-track.mp3",
    //   duration: "4:20"
    // }
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Initialize audio context for mobile browsers
  const initializeAudio = async () => {
    if (audioInitialized) return;
    
    try {
      // Create and resume audio context for mobile
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        await audioContextRef.current.resume();
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
    // Initialize audio on first interaction
    if (!audioInitialized) {
      await initializeAudio();
    }
    
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          // For mobile, ensure we have user interaction context
          if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
          
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (err) {
        console.log('Audio playback failed:', err);
        setIsPlaying(false);
        
        // Fallback: try to create a silent audio context first
        try {
          if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
          }
          await audioContextRef.current.resume();
          
          // Create a silent buffer to establish audio context
          const silentBuffer = audioContextRef.current.createBuffer(1, 1, 22050);
          const source = audioContextRef.current.createBufferSource();
          source.buffer = silentBuffer;
          source.connect(audioContextRef.current.destination);
          source.start();
          source.stop();
          
          // Now try to play the actual audio
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (retryErr) {
          console.log('Mobile audio fallback failed:', retryErr);
        }
      }
    }
  };

  const switchTrack = async (index) => {
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setCurrentTrackIndex(index);
    
    // Auto-play new track if previous was playing
    setTimeout(async () => {
      if (wasPlaying && audioRef.current) {
        try {
          await audioRef.current.play();
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

  // Mobile-optimized touch handlers
  const handlePlayPause = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure audio context is initialized on first touch
    if (!audioInitialized) {
      await initializeAudio();
    }
    
    await togglePlay();
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
        preload="none" // Don't preload until user interaction
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
