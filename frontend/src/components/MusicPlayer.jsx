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
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef(null);

  // Music tracks configuration
  const tracks = [
    {
      title: "Background Music",
      artist: "Portfolio Theme",
      file: "/music/background.mp3",
      duration: "3:45"
    },
    {
    title: "waiting for love.mp3",
    artist: "Portfolio Theme", 
    file: "/music/waiting for love.mp3",
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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
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
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
        setIsPlaying(true);
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

  // Smart toggle: single tap for play/pause, long press for mute/unmute
  const handleMainTouch = (e) => {
    e.preventDefault();
    
    // Clear any existing timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      toggleMute();
      setShowVolumeTooltip(true);
      setTimeout(() => setShowVolumeTooltip(false), 2000);
    }, 500); // 500ms for long press
    
    // Handle touch end for single tap
    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        togglePlay(); // Single tap - play/pause
      }
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseup', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseup', handleTouchEnd);
  };

  // Quick volume adjustment with swipe
  const handleVolumeSwipe = (deltaY) => {
    const sensitivity = 0.01;
    const newVolume = Math.max(0, Math.min(1, volume - (deltaY * sensitivity)));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setShowVolumeTooltip(true);
    setTimeout(() => setShowVolumeTooltip(false), 1000);
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
    if (e.target.closest('.control-button') || e.target.closest('.volume-slider')) {
      return;
    }
    
    const touch = e.touches[0];
    touchStartPos.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
      initialY: touch.clientY
    };
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartPos.current.initialY;
    
    // Vertical swipe for volume when not dragging
    if (Math.abs(deltaY) > 10 && !isDragging) {
      handleVolumeSwipe(deltaY);
      return;
    }
    
    // Horizontal/diagonal movement for dragging
    if (!isDragging && Math.abs(touch.clientX - touchStartPos.current.x - position.x) > 20) {
      setIsDragging(true);
    }
    
    if (isDragging) {
      const newX = touch.clientX - touchStartPos.current.x;
      const newY = touch.clientY - touchStartPos.current.y;
      
      const maxX = window.innerWidth - 280;
      const maxY = window.innerHeight - 120;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
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
        loop
        onEnded={() => {
          setIsPlaying(false);
          // Auto-play next track if available
          if (tracks.length > 1) {
            nextTrack();
          }
        }}
        key={currentTrackIndex} // Force re-render when track changes
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
          onTouchStart={handleMainTouch}
          onMouseDown={handleMainTouch}
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
                  onClick={prevTrack}
                  title="Previous track"
                >
                  <ChevronUp size={16} />
                </button>
                <span className="track-info">
                  {currentTrackIndex + 1}/{tracks.length}
                </span>
                <button 
                  className="control-button track-button" 
                  onClick={nextTrack}
                  title="Next track"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
            
            <div className="volume-control expanded">
              <button 
                className="control-button" 
                onClick={toggleMute}
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
