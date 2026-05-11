import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Per-animal scale for explore mode (smaller than battle since they're farther away)
const MODEL_SCALES = {
  Bull: 0.7,
  Stag: 0.7,
  Husky: 0.8,
  Wolf: 0.8,
  Deer: 0.7,
  Horse: 0.65,
  Shibalnu: 0.85,
  Donkey: 0.7,
  Cow: 0.7,
  Horse_White: 0.65,
  Fox: 0.85,
  Alpaca: 0.7
};

// ══════════ EXPLORE MODE - 3D Village ══════════
export class ExploreMode {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.gltfLoader = new GLTFLoader();
    
    // Player state
    this.playerPos = new THREE.Vector3(0, 1.7, 15);  // start at village entrance
    this.playerRot = Math.PI;  // facing into village
    this.playerVel = new THREE.Vector3();
    this.moveSpeed = 6.0;      // units per second (doubled from 3.0)
    this.rotSpeed = 2.5;       // radians per second (slightly faster too)
    this.gravity = -9.8;
    this.groundY = 1.7;        // camera height above ground
    
    // Input state
    this.keys = {};
    this.mouseX = 0;
    this.mouseSensitivity = 0.002;
    
    // World objects
    this.buildings = [];
    this.props = [];
    this.animalNPCs = [];
    this.colliders = [];
    
    // Village asset cache
    this.modelCache = {};
    
    // Animation
    this.clock = new THREE.Clock();
    this.mixers = [];  // for animated NPCs
    
    this.initScene();
    this.setupControls();
  }
  
  initScene() {
    console.log('[Explore] initScene starting...');
    
    // Get dimensions from the frame element
    const frame = document.getElementById('frame');
    const exploreContainer = document.getElementById('explore-container');
    
    let w = 800, h = 600;
    
    if (frame) {
      w = frame.clientWidth || 800;
      h = frame.clientHeight || 600;
      console.log('[Explore] Frame dimensions:', w, 'x', h);
    } else {
      console.warn('[Explore] Frame not found, using defaults');
    }
    
    console.log('[Explore] Creating camera and renderer...');
    
    this.camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 1000);
    this.camera.position.set(0, 1.7, 15);
    this.camera.lookAt(0, 0, 0);
    this.playerPos.set(0, 1.7, 15);
    this.playerRot = Math.PI;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = false;  // Disable shadows for now
    this.renderer.setClearColor(0x87ceeb);
    
    // CRITICAL: Disable tone mapping which was making scene dark
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    console.log('[Explore] Renderer created, size:', w, 'x', h);
    console.log('[Explore] Renderer dom element:', this.renderer.domElement);
    
    // Add to explore container
    if (exploreContainer) {
      // Make sure container fills the frame
      exploreContainer.style.width = w + 'px';
      exploreContainer.style.height = h + 'px';
      
      exploreContainer.appendChild(this.renderer.domElement);
      console.log('[Explore] Canvas appended. Container children:', exploreContainer.children.length);
      
      // Style the canvas
      this.renderer.domElement.style.display = 'block';
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
    } else {
      console.error('[Explore] ERROR: explore-container not found!');
      return;
    }
    
    // Lighting - VERY bright daytime
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);  // Much brighter
    this.scene.add(ambient);
    
    const hemi = new THREE.HemisphereLight(0xffffff, 0xddccaa, 1.0);
    this.scene.add(hemi);
    
    const sun = new THREE.DirectionalLight(0xffffff, 2.0);
    sun.position.set(50, 100, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    this.scene.add(sun);
    
    // Multiple point lights for visibility
    const pointLight1 = new THREE.PointLight(0xffffff, 2.0, 100);
    pointLight1.position.set(0, 15, 0);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffeecc, 1.0, 50);
    pointLight2.position.set(15, 8, 15);
    this.scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xffeecc, 1.0, 50);
    pointLight3.position.set(-15, 8, -15);
    this.scene.add(pointLight3);
    
    // Lighter fog so you can see further
    this.scene.fog = new THREE.Fog(0xb0d8ff, 80, 250);
    
    // Sky color - bright blue
    this.scene.background = new THREE.Color(0xb0d8ff);
    
    // Ground plane - bright green using BasicMaterial
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80  // bright green
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
    
    console.log('[Explore] Scene initialized, camera at:', this.camera.position);
  }
  
  setupControls() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      
      // Space for interaction (trigger battles)
      if (e.key === ' ') {
        console.log('[Explore] SPACE pressed, nearestNPC:', this.nearestNPC?.type || 'none');
        this.tryInteract();
      }
      
      // ESC for pause
      if (e.key === 'Escape') {
        this.togglePause();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
    
    // Mouse look (optional - can enable later)
    // For now, just arrow keys for rotation
  }
  
  async loadModel(path) {
    if (this.modelCache[path]) {
      // Clone cached model
      return this.modelCache[path].scene.clone();
    }
    
    const gltf = await this.gltfLoader.loadAsync(path);
    this.modelCache[path] = gltf;
    return gltf.scene.clone();
  }
  
  // ══════════ VILLAGE CONSTRUCTION ══════════
  
  async buildVillage() {
    console.log('[Explore] Building village...');
    
    // For now, create placeholder buildings as colored boxes
    // Later we'll replace with actual GLTF models from medieval pack
    
    // Village layout (8 buildings in a rough circle around center)
    const buildingPositions = [
      {name: 'Tavern',     pos: {x: -8,  z: -8}, rot: Math.PI/4,   size: {x:6, y:4, z:8},  color: 0xc97a3f},
      {name: 'Barn',       pos: {x: 8,   z: -8}, rot: -Math.PI/4,  size: {x:10,y:6, z:10}, color: 0xd4502a},
      {name: 'Church',     pos: {x: 0,   z: -15},rot: 0,           size: {x:8, y:10,z:12}, color: 0xf0f0f0},
      {name: 'Blacksmith', pos: {x: -12, z: 0},  rot: Math.PI/2,   size: {x:5, y:4, z:6},  color: 0x808080},
      {name: 'House_1',    pos: {x: 12,  z: 0},  rot: -Math.PI/2,  size: {x:6, y:5, z:6},  color: 0xff8c42},
      {name: 'House_2',    pos: {x: -8,  z: 8},  rot: 3*Math.PI/4, size: {x:6, y:5, z:6},  color: 0xffa756},
      {name: 'Shop',       pos: {x: 8,   z: 8},  rot: -3*Math.PI/4,size: {x:5, y:4, z:7},  color: 0xffd700},
      {name: 'Well',       pos: {x: 0,   z: 0},  rot: 0,           size: {x:2, y:3, z:2},  color: 0xa0a0a0}
    ];
    
    for (const bld of buildingPositions) {
      await this.createBuilding(bld);
    }
    
    // Add some trees around the perimeter
    await this.addTrees();
    
    console.log('[Explore] Village built!');
  }
  
  async createBuilding(config) {
    // Use MeshBasicMaterial - no lighting needed, always full brightness
    const geo = new THREE.BoxGeometry(config.size.x, config.size.y, config.size.z);
    const mat = new THREE.MeshBasicMaterial({
      color: config.color
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(config.pos.x, config.size.y / 2, config.pos.z);
    mesh.rotation.y = config.rot;
    mesh.userData.name = config.name;
    
    this.scene.add(mesh);
    this.buildings.push(mesh);
    
    // Add collider (AABB)
    this.addCollider(
      new THREE.Vector3(config.pos.x, 0, config.pos.z),
      new THREE.Vector3(config.size.x, config.size.y, config.size.z),
      config.rot
    );
  }
  
  async addTrees() {
    // Simple tree placeholders using BasicMaterial (always bright)
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
    const trunkMat = new THREE.MeshBasicMaterial({color: 0x8b4513});
    const foliageGeo = new THREE.SphereGeometry(2, 8, 8);
    const foliageMat = new THREE.MeshBasicMaterial({color: 0x228b22});
    
    const treePositions = [
      {x: -18, z: -10}, {x: -18, z: 0}, {x: -18, z: 10},
      {x: 18, z: -10}, {x: 18, z: 0}, {x: 18, z: 10},
      {x: -10, z: -18}, {x: 0, z: -20}, {x: 10, z: -18},
      {x: -10, z: 18}, {x: 0, z: 20}, {x: 10, z: 18}
    ];
    
    for (const pos of treePositions) {
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(pos.x, 1.5, pos.z);
      this.scene.add(trunk);
      
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.set(pos.x, 4, pos.z);
      this.scene.add(foliage);
      
      this.props.push(trunk, foliage);
      
      // Tree collision
      this.addCollider(
        new THREE.Vector3(pos.x, 0, pos.z),
        new THREE.Vector3(1, 6, 1),
        0
      );
    }
  }
  
  // ══════════ ANIMAL NPC PLACEMENT ══════════
  
  async placeAnimalNPCs() {
    console.log('[Explore] Placing animal NPCs...');
    
    // 12 animals distributed around village
    // Each animal associated with a building/area
    const animalPlacements = [
      {type: 'Bull',        pos: {x: 10,  z: -6},  area: 'Barn'},
      {type: 'Cow',         pos: {x: 7,   z: -10}, area: 'Barn'},
      {type: 'Horse',       pos: {x: 9,   z: -4},  area: 'Barn'},
      {type: 'Donkey',      pos: {x: -6,  z: -6},  area: 'Tavern'},
      {type: 'Wolf',        pos: {x: -16, z: 8},   area: 'Forest'},
      {type: 'Fox',         pos: {x: -14, z: -8},  area: 'Forest'},
      {type: 'Deer',        pos: {x: 16,  z: 10},  area: 'Forest'},
      {type: 'Stag',        pos: {x: 14,  z: -10}, area: 'Forest'},
      {type: 'Husky',       pos: {x: -10, z: 6},   area: 'House'},
      {type: 'Shibalnu',    pos: {x: 10,  z: 6},   area: 'House'},
      {type: 'Alpaca',      pos: {x: -2,  z: 2},   area: 'Village Center'},
      {type: 'Horse_White', pos: {x: 2,   z: -2},  area: 'Village Center'}
    ];
    
    for (const placement of animalPlacements) {
      await this.createAnimalNPC(placement);
    }
    
    console.log('[Explore] NPCs placed!');
  }
  
  async createAnimalNPC(config) {
    // Phase 2: Load actual animal GLTF model
    const path = `./Models/Animals/${config.type}.gltf`;
    
    try {
      console.log(`[Explore] Loading animal model: ${config.type}`);
      const gltf = await this.gltfLoader.loadAsync(path);
      const mesh = gltf.scene;
      
      // Convert materials to ensure visibility (same as battle mode)
      mesh.traverse(child => {
        if (child.isMesh && child.material) {
          // Force MeshBasicMaterial-like rendering for consistent visibility
          if (child.material.map) {
            // Has texture - create new MeshBasicMaterial with texture
            const newMat = new THREE.MeshBasicMaterial({
              map: child.material.map,
              color: 0xffffff
            });
            child.material = newMat;
          } else {
            // No texture - use color from existing material
            const color = child.material.color || new THREE.Color(0xffffff);
            child.material = new THREE.MeshBasicMaterial({color: color});
          }
        }
      });
      
      // Scale and position based on model config
      const scale = MODEL_SCALES[config.type] || 1.0;
      mesh.scale.setScalar(scale);
      mesh.position.set(config.pos.x, 0, config.pos.z);
      
      this.scene.add(mesh);
      
      // Set up animation mixer for walk loop
      let mixer = null;
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(mesh);
        
        // Find walk or idle animation
        let clip = gltf.animations.find(a => a.name.toLowerCase().includes('walk'));
        if (!clip) clip = gltf.animations.find(a => a.name.toLowerCase().includes('idle'));
        if (!clip) clip = gltf.animations[0];
        
        if (clip) {
          const action = mixer.clipAction(clip);
          action.play();
          this.mixers.push(mixer);
        }
      }
      
      const npc = {
        type: config.type,
        area: config.area,
        position: new THREE.Vector3(config.pos.x, 0, config.pos.z),
        mesh: mesh,
        mixer: mixer,
        defeated: false,
        state: 'idle',
        triggerRadius: 4.0,
        idleRotation: Math.random() * Math.PI * 2,
        idleTimer: 0
      };
      
      this.animalNPCs.push(npc);
    } catch (err) {
      console.error(`[Explore] Failed to load ${config.type}, using placeholder:`, err);
      
      // Fallback to orange sphere
      const geo = new THREE.SphereGeometry(0.7, 16, 16);
      const mat = new THREE.MeshBasicMaterial({color: 0xff6b35});
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(config.pos.x, 0.7, config.pos.z);
      this.scene.add(mesh);
      
      this.animalNPCs.push({
        type: config.type,
        area: config.area,
        position: new THREE.Vector3(config.pos.x, 0, config.pos.z),
        mesh: mesh,
        mixer: null,
        defeated: false,
        state: 'idle',
        triggerRadius: 4.0,
        idleRotation: Math.random() * Math.PI * 2,
        idleTimer: 0
      });
    }
  }
  
  // ══════════ COLLISION SYSTEM ══════════
  
  addCollider(center, size, rotation) {
    // Use proper AABB without expansion for cleaner collision
    const halfSize = size.clone().multiplyScalar(0.5);
    
    this.colliders.push({
      center: center.clone(),
      halfSize: halfSize.clone(),
      rotation: rotation
    });
  }
  
  checkCollision(point) {
    const playerRadius = 0.4;  // Player is treated as a small cylinder
    
    for (const col of this.colliders) {
      // For rotated buildings, transform point into building's local space
      let localX = point.x - col.center.x;
      let localZ = point.z - col.center.z;
      
      // Rotate point into building's frame
      const cos = Math.cos(-col.rotation);
      const sin = Math.sin(-col.rotation);
      const rotX = localX * cos - localZ * sin;
      const rotZ = localX * sin + localZ * cos;
      
      // Check if point (with player radius) is inside the rotated AABB
      if (Math.abs(rotX) < col.halfSize.x + playerRadius &&
          Math.abs(rotZ) < col.halfSize.z + playerRadius) {
        return true;  // collision!
      }
    }
    
    return false;
  }
  
  // ══════════ MOVEMENT & UPDATE ══════════
  
  update(dt) {
    // Player movement
    const moveDir = new THREE.Vector3();
    
    // Forward/backward (W/S or ArrowUp/Down) - FIXED direction
    if (this.keys['w'] || this.keys['arrowup']) {
      moveDir.z = 1;  // Forward (positive Z when accounting for camera rotation)
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      moveDir.z = -1;  // Backward
    }
    
    // Strafe left/right - rotate the camera with A/D for now
    if (this.keys['a'] || this.keys['arrowleft']) {
      this.playerRot += this.rotSpeed * dt;
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      this.playerRot -= this.rotSpeed * dt;
    }
    
    // Apply movement based on player rotation
    if (moveDir.length() > 0) {
      moveDir.normalize();
      
      // Forward direction relative to player rotation
      // playerRot=0 means looking down -Z axis
      // playerRot=PI means looking down +Z axis (toward village)
      const forward = new THREE.Vector3(
        -Math.sin(this.playerRot),
        0,
        -Math.cos(this.playerRot)
      );
      
      // Calculate new position
      const newPos = this.playerPos.clone();
      newPos.x += forward.x * moveDir.z * this.moveSpeed * dt;
      newPos.z += forward.z * moveDir.z * this.moveSpeed * dt;
      
      // Check collision
      if (!this.checkCollision(newPos)) {
        this.playerPos.copy(newPos);
      }
    }
    
    // Update camera
    this.camera.position.copy(this.playerPos);
    this.camera.rotation.y = this.playerRot;
    
    // Update animal NPCs
    this.updateNPCs(dt);
    
    // Update mixers for animated NPCs
    this.mixers.forEach(mixer => mixer.update(dt));
  }
  
  updateNPCs(dt) {
    let nearestNPC = null;
    let nearestDist = Infinity;
    
    for (const npc of this.animalNPCs) {
      if (npc.defeated) {
        npc.state = 'corpse';
        continue;
      }
      
      // Check distance to player (only X/Z, ignore Y)
      const dx = this.playerPos.x - npc.position.x;
      const dz = this.playerPos.z - npc.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      
      if (dist < npc.triggerRadius) {
        npc.state = 'alert';
        
        // Face player
        const angleToPlayer = Math.atan2(dx, dz);
        npc.mesh.rotation.y = angleToPlayer;
        
        // Track nearest NPC for interaction prompt
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestNPC = npc;
        }
      } else {
        npc.state = 'idle';
        
        // Idle rotation bobbing
        npc.idleTimer += dt;
        npc.mesh.rotation.y = npc.idleRotation + Math.sin(npc.idleTimer * 0.5) * 0.3;
      }
    }
    
    // Show prompt for nearest NPC, or hide if none nearby
    if (nearestNPC) {
      this.showInteractPrompt(nearestNPC);
    } else {
      this.hideInteractPrompt();
    }
  }
  
  showInteractPrompt(npc) {
    const prompt = document.getElementById('interact-prompt');
    if (prompt) {
      prompt.textContent = `Press SPACE to challenge ${npc.type}`;
      prompt.style.display = 'block';
      
      // Store current NPC for interaction
      this.nearestNPC = npc;
    }
  }
  
  hideInteractPrompt() {
    const prompt = document.getElementById('interact-prompt');
    if (prompt) {
      prompt.style.display = 'none';
    }
    this.nearestNPC = null;
  }
  
  tryInteract() {
    if (this.nearestNPC && !this.nearestNPC.defeated) {
      console.log(`[Explore] Triggering battle with ${this.nearestNPC.type}`);
      
      // Hide the interact prompt immediately
      this.hideInteractPrompt();
      
      // Dispatch event to main game controller
      window.dispatchEvent(new CustomEvent('startBattle', {
        detail: {
          animalType: this.nearestNPC.type,
          npc: this.nearestNPC
        }
      }));
    }
  }
  
  togglePause() {
    // TODO: Implement pause menu
    console.log('[Explore] Pause menu');
  }
  
  // ══════════ RENDER LOOP ══════════
  
  render() {
    if (!this.frameCount) this.frameCount = 0;
    this.frameCount++;
    
    // Log every 60 frames (about once per second)
    if (this.frameCount % 60 === 0) {
      console.log('[Explore] Rendering frame', this.frameCount, 
                  '| Camera:', this.camera.position.toArray(),
                  '| Scene objects:', this.scene.children.length);
    }
    
    const dt = this.clock.getDelta();
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
  }
  
  // ══════════ PUBLIC API ══════════
  
  async init() {
    await this.buildVillage();
    await this.placeAnimalNPCs();
    console.log('[Explore] Init complete. Scene has', this.scene.children.length, 'objects');
  }
  
  setAnimalDefeated(npc) {
    npc.defeated = true;
    npc.state = 'corpse';
    
    // Make mesh semi-transparent
    npc.mesh.traverse(child => {
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = 0.5;
        child.material.emissiveIntensity = 0;
      }
    });
  }
  
  getPlayerState() {
    return {
      position: this.playerPos.clone(),
      rotation: this.playerRot
    };
  }
  
  setPlayerState(state) {
    this.playerPos.copy(state.position);
    this.playerRot = state.rotation;
  }
}
