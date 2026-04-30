import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
    this.moveSpeed = 3.0;      // units per second
    this.rotSpeed = 2.0;       // radians per second
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x87ceeb);
    
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
    
    // Ground plane - brighter green
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x90ee90,  // Light green
      roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    console.log('[Explore] Scene initialized, camera at:', this.camera.position);
  }
  
  setupControls() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      
      // Space for interaction (will trigger battles later)
      if (e.key === ' ') {
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
    // Placeholder: colored box for now
    // TODO: Replace with actual GLTF models
    const geo = new THREE.BoxGeometry(config.size.x, config.size.y, config.size.z);
    const mat = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: 0.8
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(config.pos.x, config.size.y / 2, config.pos.z);
    mesh.rotation.y = config.rot;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
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
    // Simple tree placeholders (cylinders + spheres)
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
    const trunkMat = new THREE.MeshStandardMaterial({color: 0x8b4513});
    const foliageGeo = new THREE.SphereGeometry(2, 8, 8);
    const foliageMat = new THREE.MeshStandardMaterial({color: 0x228b22});
    
    const treePositions = [
      {x: -18, z: -10}, {x: -18, z: 0}, {x: -18, z: 10},
      {x: 18, z: -10}, {x: 18, z: 0}, {x: 18, z: 10},
      {x: -10, z: -18}, {x: 0, z: -20}, {x: 10, z: -18},
      {x: -10, z: 18}, {x: 0, z: 20}, {x: 10, z: 18}
    ];
    
    for (const pos of treePositions) {
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(pos.x, 1.5, pos.z);
      trunk.castShadow = true;
      this.scene.add(trunk);
      
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.set(pos.x, 4, pos.z);
      foliage.castShadow = true;
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
    // For now, placeholder spheres
    // TODO: Load actual animal GLTF models
    const geo = new THREE.SphereGeometry(0.5, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.2
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(config.pos.x, 0.5, config.pos.z);
    mesh.castShadow = true;
    this.scene.add(mesh);
    
    const npc = {
      type: config.type,
      area: config.area,
      position: new THREE.Vector3(config.pos.x, 0, config.pos.z),
      mesh: mesh,
      mixer: null,
      defeated: false,
      state: 'idle',
      triggerRadius: 3.0,  // approach within 3 units to see prompt
      idleRotation: Math.random() * Math.PI * 2,
      idleTimer: 0
    };
    
    this.animalNPCs.push(npc);
  }
  
  // ══════════ COLLISION SYSTEM ══════════
  
  addCollider(center, size, rotation) {
    // Simple AABB (axis-aligned bounding box)
    // For rotated buildings, we'll use a slightly larger box to be safe
    const halfSize = size.clone().multiplyScalar(0.5);
    
    // Expand slightly for rotated buildings
    const expansion = Math.abs(Math.sin(rotation)) * Math.max(size.x, size.z) * 0.5;
    
    this.colliders.push({
      center: center.clone(),
      halfSize: new THREE.Vector3(
        halfSize.x + expansion,
        halfSize.y,
        halfSize.z + expansion
      )
    });
  }
  
  checkCollision(point) {
    const playerRadius = 0.5;  // treat player as 0.5 unit radius cylinder
    
    for (const col of this.colliders) {
      // Expand collider by player radius
      const minX = col.center.x - col.halfSize.x - playerRadius;
      const maxX = col.center.x + col.halfSize.x + playerRadius;
      const minZ = col.center.z - col.halfSize.z - playerRadius;
      const maxZ = col.center.z + col.halfSize.z + playerRadius;
      
      if (point.x > minX && point.x < maxX &&
          point.z > minZ && point.z < maxZ) {
        return true;  // collision!
      }
    }
    
    return false;
  }
  
  // ══════════ MOVEMENT & UPDATE ══════════
  
  update(dt) {
    // Player movement
    const moveDir = new THREE.Vector3();
    
    // Forward/backward (W/S or ArrowUp/Down)
    if (this.keys['w'] || this.keys['arrowup']) {
      moveDir.z -= 1;
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      moveDir.z += 1;
    }
    
    // Strafe left/right (A/D for rotation for now)
    // We'll use A/D to rotate the camera instead of strafe
    if (this.keys['a'] || this.keys['arrowleft']) {
      this.playerRot += this.rotSpeed * dt;
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      this.playerRot -= this.rotSpeed * dt;
    }
    
    // Normalize and apply rotation
    if (moveDir.length() > 0) {
      moveDir.normalize();
      
      // Rotate movement direction by player rotation
      const rotatedDir = new THREE.Vector3();
      rotatedDir.x = moveDir.x * Math.cos(this.playerRot) - moveDir.z * Math.sin(this.playerRot);
      rotatedDir.z = moveDir.x * Math.sin(this.playerRot) + moveDir.z * Math.cos(this.playerRot);
      
      // Calculate new position
      const newPos = this.playerPos.clone();
      newPos.x += rotatedDir.x * this.moveSpeed * dt;
      newPos.z += rotatedDir.z * this.moveSpeed * dt;
      
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
    for (const npc of this.animalNPCs) {
      if (npc.defeated) {
        npc.state = 'corpse';
        continue;
      }
      
      // Check distance to player
      const dist = this.playerPos.distanceTo(npc.position);
      
      if (dist < npc.triggerRadius) {
        npc.state = 'alert';
        
        // Face player
        const dirToPlayer = new THREE.Vector3()
          .subVectors(this.playerPos, npc.position)
          .normalize();
        const angleToPlayer = Math.atan2(dirToPlayer.x, dirToPlayer.z);
        npc.mesh.rotation.y = angleToPlayer;
        
        // Show interaction prompt
        this.showInteractPrompt(npc);
      } else {
        npc.state = 'idle';
        
        // Idle rotation bobbing
        npc.idleTimer += dt;
        npc.mesh.rotation.y = npc.idleRotation + Math.sin(npc.idleTimer * 0.5) * 0.3;
      }
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
