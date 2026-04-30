import { ExploreMode } from './explore.js';
import { ModeManager } from './transitions.js';

// ══════════ MAIN ENTRY POINT - WORDSLAP 3D ══════════

let modeManager = null;

async function bootGame() {
  console.log('[Main] Booting WORDSLAP 3D...');
  
  // Create explore mode
  const exploreMode = new ExploreMode();
  
  // For now, battle mode is handled by existing game.js
  // We'll create a wrapper object that the ModeManager can use
  const battleModeStub = {
    // This will be integrated with your existing game.js battle system
  };
  
  // Create mode manager
  modeManager = new ModeManager(exploreMode, battleModeStub);
  
  // Initialize (builds village, places NPCs)
  await modeManager.init();
  
  console.log('[Main] Game ready!');
  
  // Enable play button
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.disabled = false;
    playBtn.textContent = '▶ START EXPLORING';
  }
  
  // Hide loading dots
  const dots = document.getElementById('ldots');
  if (dots) dots.style.display = 'none';
  
  const ltext = document.getElementById('ltext');
  if (ltext) ltext.textContent = 'Ready to slap!';
}

// Start button handler
window.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('playBtn');
  
  playBtn.addEventListener('click', startGame);
  
  // Also allow Enter/Space from title screen
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && playBtn && !playBtn.disabled) {
      const titleScreen = document.getElementById('sTitle');
      if (titleScreen && titleScreen.style.display !== 'none') {
        startGame();
      }
    }
  });
});

function startGame() {
  console.log('[Main] Starting game...');
  
  // Hide title screen
  const titleScreen = document.getElementById('sTitle');
  if (titleScreen) {
    titleScreen.style.display = 'none';
  }
  
  // Show explore mode
  if (modeManager) {
    modeManager.switchToExplore();
  }
}

// Boot the game
bootGame();

// Export for debugging
window.modeManager = modeManager;
