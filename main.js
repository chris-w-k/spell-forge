import { ExploreMode } from './explore.js';
import { ModeManager } from './transitions.js';

// Import game.js which exports battle system
import './game.js';

// ══════════ MAIN ENTRY POINT - WORDSLAP 3D ══════════

let modeManager = null;
let exploreMode = null;

async function bootGame() {
  console.log('[Main] Booting WORDSLAP 3D...');
  
  // Initialize battle system first (it needs to set up Three.js renderer)
  console.log('[Main] Initializing battle system...');
  if (window.WORDSLAP_Battle) {
    window.WORDSLAP_Battle.initThree();
    await window.WORDSLAP_Battle.preloadAll();
  }
  
  // Create explore mode
  console.log('[Main] Creating explore mode...');
  exploreMode = new ExploreMode();
  
  // Create mode manager
  modeManager = new ModeManager(exploreMode, null);
  
  // Initialize explore mode (builds village, places NPCs)
  console.log('[Main] Building village...');
  await modeManager.init();
  
  console.log('[Main] Game ready!');
  
  // Update play button
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.disabled = false;
    playBtn.textContent = '▶ START EXPLORING';
  }
  
  // Hide loading indicator
  const ltext = document.getElementById('ltext');
  if (ltext) ltext.textContent = 'Ready to explore!';
}

// Start button handler
window.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('playBtn');
  
  if (playBtn) {
    playBtn.addEventListener('click', startGame);
  }
  
  // Also allow Enter/Space from title screen
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && playBtn && !playBtn.disabled) {
      const titleScreen = document.getElementById('sTitle');
      if (titleScreen && window.getComputedStyle(titleScreen).display !== 'none') {
        e.preventDefault();
        startGame();
      }
    }
  });
});

function startGame() {
  console.log('[Main] Starting game...');
  
  // Hide title screen properly using the .gone class
  const titleScreen = document.getElementById('sTitle');
  if (titleScreen) {
    titleScreen.classList.add('gone');
    titleScreen.style.display = 'none';  // belt and suspenders
  }
  
  // Hide all battle UI elements initially
  const battleContainer = document.getElementById('three-container');
  const topUI = document.getElementById('topui');
  const bottomUI = document.getElementById('bottomui');
  const fxLayer = document.getElementById('fxlayer');
  
  if (battleContainer) battleContainer.style.display = 'none';
  if (topUI) topUI.style.display = 'none';
  if (bottomUI) bottomUI.style.display = 'none';
  if (fxLayer) fxLayer.style.display = 'none';
  
  // Show explore mode
  if (modeManager) {
    modeManager.switchToExplore();
  }
}

// Boot the game
bootGame();

// Export for debugging
window.modeManager = modeManager;
window.exploreMode = exploreMode;
