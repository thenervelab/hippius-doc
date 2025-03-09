// Zoom functionality for architecture diagram
document.addEventListener('DOMContentLoaded', function() {
  // Find the architecture diagram container
  const diagramContainer = document.querySelector('.architecture-diagram-container');
  
  if (!diagramContainer) return;
  
  // Find the SVG object
  const svgObject = diagramContainer.querySelector('.architecture-diagram');
  
  if (!svgObject) return;
  
  // Create zoom controls
  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';
  
  // Add zoom in button
  const zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'zoom-btn';
  zoomInBtn.innerHTML = '+';
  zoomInBtn.setAttribute('aria-label', 'Zoom in');
  
  // Add zoom out button
  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'zoom-btn';
  zoomOutBtn.innerHTML = '−'; // Using minus sign
  zoomOutBtn.setAttribute('aria-label', 'Zoom out');
  
  // Add reset zoom button
  const resetZoomBtn = document.createElement('button');
  resetZoomBtn.className = 'zoom-btn';
  resetZoomBtn.innerHTML = '↺'; // Reset symbol
  resetZoomBtn.setAttribute('aria-label', 'Reset zoom');
  
  // Add zoom level display
  const zoomLevel = document.createElement('div');
  zoomLevel.className = 'zoom-level';
  zoomLevel.innerHTML = '100%';
  
  // Add buttons to controls
  zoomControls.appendChild(zoomOutBtn);
  zoomControls.appendChild(zoomLevel);
  zoomControls.appendChild(zoomInBtn);
  zoomControls.appendChild(resetZoomBtn);
  
  // Add controls to container
  diagramContainer.appendChild(zoomControls);
  
  // Set initial zoom level
  let currentZoom = 1;
  const zoomStep = 0.1;
  const maxZoom = 3;
  const minZoom = 0.5;
  
  // Update zoom display
  function updateZoomDisplay() {
    zoomLevel.innerHTML = Math.round(currentZoom * 100) + '%';
    svgObject.style.transform = `scale(${currentZoom})`;
    svgObject.style.transformOrigin = 'center center';
  }
  
  // Zoom in function
  function zoomIn() {
    if (currentZoom < maxZoom) {
      currentZoom += zoomStep;
      updateZoomDisplay();
    }
  }
  
  // Zoom out function
  function zoomOut() {
    if (currentZoom > minZoom) {
      currentZoom -= zoomStep;
      updateZoomDisplay();
    }
  }
  
  // Reset zoom function
  function resetZoom() {
    currentZoom = 1;
    updateZoomDisplay();
  }
  
  // Add event listeners to buttons
  zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn.addEventListener('click', zoomOut);
  resetZoomBtn.addEventListener('click', resetZoom);
  
  // Add mouse wheel zoom support
  diagramContainer.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
      e.preventDefault(); // Prevent page zoom
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  }, { passive: false });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Only respond if the diagram container is in view
    const rect = diagramContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    // Ctrl + Plus: Zoom in
    if (e.ctrlKey && e.key === '+') {
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
  });
}); 