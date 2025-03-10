import React, { useEffect, useRef, useState } from 'react';
import ArchitectureFlowDiagram from './ArchitectureFlowDiagram';

export default function ArchitectureDiagram() {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    try {
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (e) => {
      try {
        if (e.key === 'Escape' && isFullscreen) {
          setIsFullscreen(false);
        }
      } catch (error) {
        console.error("Error handling escape key:", error);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen]);

  return (
    <div 
      className={`architecture-diagram-container ${isFullscreen ? 'fullscreen' : ''}`}
      // ref={containerRef}
      // style={{ padding: 0, margin: 0 }}
    >
      <ArchitectureFlowDiagram />
      
      {/* Fullscreen button */}
      <button 
        className="fullscreen-btn" 
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? '⤓' : '⤢'}
      </button>
      
      {/* Exit fullscreen button (visible only in fullscreen mode) */}
      <button 
        className="exit-fullscreen-btn" 
        onClick={toggleFullscreen}
      >
        Exit Fullscreen (Esc)
      </button>
      
      <div className="zoom-tooltip">
        Use mouse wheel to zoom. Drag to pan. Press F for fullscreen.
      </div>
    </div>
  );
} 