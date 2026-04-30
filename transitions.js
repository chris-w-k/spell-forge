// ══════════ MODE MANAGER - Explore ↔ Battle Transitions ══════════

export class ModeManager {
  constructor(exploreMode, battleMode) {
    this.explore = exploreMode;
    this.battle = battleMode;
    this.currentMode = 'explore';
    
    // Player persistent state
    this.playerState = {
      lives: 3,
      hp: 100,
      maxHp: 100,
      score: 0,
      animalsDefeated: 0,
      currentNPC: null  // reference to NPC being battled
    };
    
    // Track defeated animals
    this.defeatedAnimals = new Set();
    
    // Animation frame handle
    this.animationFrame = null;
    this.isRunning = false;
  }
  
  // ══════════ INITIALIZATION ══════════
  
  async init() {
    console.log('[ModeManager] Initializing...');
    
    // Initialize explore mode
    await this.explore.init();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start in explore mode
    this.switchToExplore();
    
    console.log('[ModeManager] Ready!');
  }
  
  setupEventListeners() {
    // Battle start event from explore mode
    window.addEventListener('startBattle', (e) => {
      this.startBattle(e.detail.animalType, e.detail.npc);
    });
    
    // Battle end events from battle mode
    window.addEventListener('battleVictory', (e) => {
      this.onBattleVictory(e.detail);
    });
    
    window.addEventListener('battleDefeat', (e) => {
      this.onBattleDefeat();
    });
  }
  
  // ══════════ MODE SWITCHING ══════════
  
  switchToExplore() {
    console.log('[ModeManager] Switching to EXPLORE mode');
    
    this.currentMode = 'explore';
    
    // Show/hide containers
    const exploreContainer = document.getElementById('explore-container');
    const battleContainer = document.getElementById('battle-container');
    const exploreHud = document.getElementById('explore-hud');
    
    if (exploreContainer) exploreContainer.style.display = 'block';
    if (battleContainer) battleContainer.style.display = 'none';
    if (exploreHud) exploreHud.style.display = 'block';
    
    // Update HUD
    this.updateExploreHUD();
    
    // Start explore render loop
    this.startRenderLoop();
  }
  
  switchToBattle() {
    console.log('[ModeManager] Switching to BATTLE mode');
    
    this.currentMode = 'battle';
    
    // Show/hide containers
    const exploreContainer = document.getElementById('explore-container');
    const battleContainer = document.getElementById('battle-container');
    const exploreHud = document.getElementById('explore-hud');
    
    if (exploreContainer) exploreContainer.style.display = 'none';
    if (battleContainer) battleContainer.style.display = 'block';
    if (exploreHud) exploreHud.style.display = 'none';
    
    // Stop explore loop, battle has its own
    this.stopRenderLoop();
  }
  
  // ══════════ BATTLE TRANSITIONS ══════════
  
  startBattle(animalType, npc) {
    console.log(`[ModeManager] Starting battle with ${animalType}`);
    
    // Store NPC reference
    this.playerState.currentNPC = npc;
    
    // Calculate difficulty based on total animals defeated (progression)
    const round = this.playerState.animalsDefeated + 1;
    
    // Switch to battle mode
    this.switchToBattle();
    
    // Initialize battle with current player HP
    // This is where you'd call into your existing game.js battle system
    // For now, we'll dispatch an event that game.js can listen to
    window.dispatchEvent(new CustomEvent('initBattle', {
      detail: {
        animalType,
        round,
        playerHP: this.playerState.hp,
        playerLives: this.playerState.lives
      }
    }));
  }
  
  onBattleVictory(detail) {
    console.log('[ModeManager] Battle won!');
    
    const { score, hpRemaining } = detail;
    
    // Update player state
    this.playerState.score += score;
    this.playerState.hp = Math.min(this.playerState.maxHp, hpRemaining + 20);  // heal a bit
    this.playerState.animalsDefeated++;
    
    // Mark NPC as defeated
    if (this.playerState.currentNPC) {
      this.explore.setAnimalDefeated(this.playerState.currentNPC);
      this.defeatedAnimals.add(this.playerState.currentNPC.type);
      this.playerState.currentNPC = null;
    }
    
    // Check win condition (all 12 animals defeated)
    if (this.playerState.animalsDefeated >= 12) {
      this.onGameWin();
      return;
    }
    
    // Show victory transition screen briefly
    this.showTransitionScreen('victory', () => {
      // Return to explore mode
      this.switchToExplore();
    });
  }
  
  onBattleDefeat() {
    console.log('[ModeManager] Battle lost!');
    
    // Lose a life
    this.playerState.lives--;
    
    // Reset current NPC reference (they're still alive)
    this.playerState.currentNPC = null;
    
    if (this.playerState.lives <= 0) {
      // Game over
      this.onGameOver();
    } else {
      // Show defeat screen briefly
      this.showTransitionScreen('defeat', () => {
        // Respawn at village entrance
        this.explore.setPlayerState({
          position: new THREE.Vector3(0, 1.7, 15),
          rotation: Math.PI
        });
        
        // Restore some HP
        this.playerState.hp = Math.min(this.playerState.maxHp, 50);
        
        // Return to explore
        this.switchToExplore();
      });
    }
  }
  
  // ══════════ TRANSITION SCREENS ══════════
  
  showTransitionScreen(type, callback) {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) {
      callback();
      return;
    }
    
    let message = '';
    let color = '';
    
    if (type === 'victory') {
      message = '🎉 SLAPPED! 🎉<br>Returning to village...';
      color = '#4ade80';
    } else if (type === 'defeat') {
      message = `💢 TRAMPLED! 💢<br>Lives: ${this.playerState.lives}<br>Respawning...`;
      color = '#ef4444';
    }
    
    overlay.innerHTML = `<div style="color:${color};font-size:32px;font-family:Bangers,cursive;text-align:center">${message}</div>`;
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    
    // Fade out after 2 seconds
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        callback();
      }, 500);
    }, 2000);
  }
  
  onGameWin() {
    console.log('[ModeManager] GAME WON! All animals defeated!');
    
    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div style="text-align:center;font-family:Bangers,cursive">
          <div style="font-size:56px;color:#ffd700;margin-bottom:20px">🏆 VICTORY! 🏆</div>
          <div style="font-size:32px;color:#fff">All 12 animals slapped!</div>
          <div style="font-size:24px;color:#4ade80;margin-top:20px">Final Score: ${this.playerState.score}</div>
          <button onclick="location.reload()" style="margin-top:40px;padding:15px 40px;font-size:24px;font-family:Bangers,cursive;background:#ff6b35;color:#fff;border:none;border-radius:8px;cursor:pointer">Play Again</button>
        </div>
      `;
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    }
  }
  
  onGameOver() {
    console.log('[ModeManager] GAME OVER! No lives remaining.');
    
    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div style="text-align:center;font-family:Bangers,cursive">
          <div style="font-size:56px;color:#ef4444;margin-bottom:20px">💀 GAME OVER 💀</div>
          <div style="font-size:32px;color:#fff">You were trampled!</div>
          <div style="font-size:24px;color:#fbbf24;margin-top:20px">Animals Defeated: ${this.playerState.animalsDefeated} / 12</div>
          <div style="font-size:24px;color:#fbbf24">Score: ${this.playerState.score}</div>
          <button onclick="location.reload()" style="margin-top:40px;padding:15px 40px;font-size:24px;font-family:Bangers,cursive;background:#ff6b35;color:#fff;border:none;border-radius:8px;cursor:pointer">Try Again</button>
        </div>
      `;
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    }
  }
  
  // ══════════ HUD UPDATES ══════════
  
  updateExploreHUD() {
    // Lives
    const livesEl = document.getElementById('hud-lives');
    if (livesEl) {
      livesEl.textContent = '❤️'.repeat(this.playerState.lives);
    }
    
    // HP bar
    const hpFillEl = document.getElementById('hud-hp-fill');
    const hpTextEl = document.getElementById('hud-hp-text');
    if (hpFillEl && hpTextEl) {
      const hpPercent = (this.playerState.hp / this.playerState.maxHp) * 100;
      hpFillEl.style.width = `${hpPercent}%`;
      hpTextEl.textContent = `${this.playerState.hp} / ${this.playerState.maxHp} HP`;
    }
    
    // Score
    const scoreEl = document.getElementById('hud-score');
    if (scoreEl) {
      scoreEl.textContent = `Score: ${this.playerState.score}`;
    }
    
    // Defeated count
    const defeatedEl = document.getElementById('hud-defeated');
    if (defeatedEl) {
      defeatedEl.textContent = `Defeated: ${this.playerState.animalsDefeated} / 12`;
    }
  }
  
  // ══════════ RENDER LOOP ══════════
  
  startRenderLoop() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    const loop = () => {
      if (!this.isRunning) return;
      
      if (this.currentMode === 'explore') {
        this.explore.render();
      }
      
      this.animationFrame = requestAnimationFrame(loop);
    };
    
    loop();
  }
  
  stopRenderLoop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}
