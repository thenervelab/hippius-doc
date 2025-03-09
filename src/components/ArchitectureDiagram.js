import React, { useEffect, useRef, useState } from 'react';

export default function ArchitectureDiagram() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Constants
  const zoomStep = 0.1;
  const maxZoom = 3;
  const minZoom = 0.5;

  // Update transform
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${panPosition.x}px, ${panPosition.y}px) scale(${currentZoom})`;
    }
  }, [currentZoom, panPosition]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Reset zoom and pan when toggling fullscreen
    setCurrentZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen]);

  // Zoom in function
  const zoomIn = () => {
    if (currentZoom < maxZoom) {
      setCurrentZoom(prev => prev + zoomStep);
    }
  };

  // Zoom out function
  const zoomOut = () => {
    if (currentZoom > minZoom) {
      setCurrentZoom(prev => prev - zoomStep);
    }
  };

  // Reset zoom and pan
  const resetZoom = () => {
    setCurrentZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Handle mouse wheel zoom
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  };

  // Handle mouse down for panning
  const handleMouseDown = (e) => {
    if (currentZoom > 1) {
      setIsPanning(true);
      setStartPan({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      });
      // Set cursor to grabbing immediately
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
      // Prevent default to avoid text selection
      e.preventDefault();
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e) => {
    if (isPanning) {
      setPanPosition({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y
      });
      // Prevent default to avoid text selection during panning
      e.preventDefault();
    }
  };

  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setIsPanning(false);
    // Reset cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only respond if the diagram container is in view
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isVisible) return;
      
      // Ctrl + Plus: Zoom in
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        zoomIn();
      }
      
      // Ctrl + Minus: Zoom out
      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        zoomOut();
      }
      
      // Ctrl + 0: Reset zoom
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
      
      // F key for fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      
      // Arrow keys for panning when zoomed in
      if (currentZoom > 1) {
        const panStep = 10;
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setPanPosition(prev => ({ ...prev, x: prev.x + panStep }));
        }
        
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setPanPosition(prev => ({ ...prev, x: prev.x - panStep }));
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPanPosition(prev => ({ ...prev, y: prev.y + panStep }));
        }
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setPanPosition(prev => ({ ...prev, y: prev.y - panStep }));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentZoom, isFullscreen]);

  // Set up mouse move and mouse up listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isPanning) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isPanning) {
        handleMouseUp();
      }
    };

    // Add listeners to document to ensure panning works even when mouse moves outside container
    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    // Add touch events for mobile
    if (containerRef.current) {
      const container = containerRef.current;
      
      const handleTouchStart = (e) => {
        if (currentZoom > 1 && e.touches.length === 1) {
          setIsPanning(true);
          setStartPan({
            x: e.touches[0].clientX - panPosition.x,
            y: e.touches[0].clientY - panPosition.y
          });
          e.preventDefault();
        }
      };
      
      const handleTouchMove = (e) => {
        if (isPanning && e.touches.length === 1) {
          setPanPosition({
            x: e.touches[0].clientX - startPan.x,
            y: e.touches[0].clientY - startPan.y
          });
          e.preventDefault();
        }
      };
      
      const handleTouchEnd = () => {
        setIsPanning(false);
      };
      
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPanning, currentZoom, panPosition, startPan]);

  return (
    <div 
      className={`architecture-diagram-container ${isFullscreen ? 'fullscreen' : ''}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{ 
        cursor: isPanning ? 'grabbing' : (currentZoom > 1 ? 'grab' : 'default'),
      }}
    >
      <object 
        type="image/svg+xml" 
        data="/img/hippius-architecture.svg" 
        className="architecture-diagram"
        ref={svgRef}
        style={{
          pointerEvents: currentZoom > 1 ? 'none' : 'auto', // Disable pointer events on SVG when zoomed to improve panning
        }}
      >
        Your browser does not support SVG
      </object>
      
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
      
      <div className="zoom-controls">
        <button 
          className="zoom-btn" 
          onClick={zoomOut}
          title="Zoom out"
          aria-label="Zoom out"
        >−</button>
        <div className="zoom-level">{Math.round(currentZoom * 100)}%</div>
        <button 
          className="zoom-btn" 
          onClick={zoomIn}
          title="Zoom in"
          aria-label="Zoom in"
        >+</button>
        <button 
          className="zoom-btn" 
          onClick={resetZoom}
          title="Reset zoom and pan"
          aria-label="Reset zoom"
        >↺</button>
      </div>
      
      {showTooltip && (
        <div className="zoom-tooltip">
          Use mouse wheel or buttons to zoom. When zoomed in, click and drag to pan. Press F for fullscreen.
        </div>
      )}
      
      {currentZoom > 1 && (
        <div className="pan-indicator">
          <div className="pan-text">Click and drag to pan</div>
        </div>
      )}
    </div>
  );
} 