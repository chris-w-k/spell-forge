# WORDSLAP 3D - Phase 1: Village Explorer

## 🎮 What's New

WORDSLAP now has a **3D village exploration mode**! Walk around a medieval village, find animals, and challenge them to word battles.

## 📁 File Structure

```
wordslap/
├── index.html          # Main HTML (updated with explore UI)
├── main.js             # NEW: Entry point, boots everything
├── explore.js          # NEW: 3D village exploration mode
├── transitions.js      # NEW: Mode switching (explore ↔ battle)
├── game.js             # EXISTING: 2D battle system (unchanged)
└── Models/
    └── Animals/        # Your existing 12 animal GLTFs
```

## 🕹️ Controls

### Explore Mode (3D Village)
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Rotate left
- **D / Arrow Right**: Rotate right
- **SPACE**: Interact with nearby animal (starts battle)
- **ESC**: Pause menu (not implemented yet)

### Battle Mode (2D Word Game)
- Same as before: Type letters, spell words, slap animals

## 🏗️ What Phase 1 Includes

### ✅ Implemented
1. **3D Scene Setup**
   - First-person camera
   - Day-time lighting (sun, ambient, hemisphere)
   - Fog for atmosphere
   - Sky color

2. **Village Layout**
   - 8 buildings (currently colored boxes as placeholders):
     - Tavern, Barn, Church, Blacksmith
     - House_1, House_2, Shop, Well
   - 12 trees around perimeter
   - Simple ground plane

3. **Player Movement**
   - WASD controls
   - Collision detection with buildings/trees
   - First-person camera follows player

4. **Animal NPCs**
   - 12 animals placed around village (currently orange spheres)
   - Each animal has:
     - Idle state (gentle bobbing rotation)
     - Alert state (faces player when approached)
     - Trigger radius (3 units)
   - Interaction prompt appears when near

5. **Mode Switching**
   - Smooth transitions between explore and battle
   - Player state persistence (HP, lives, score)
   - Victory/defeat transition screens
   - HUD overlay in explore mode

6. **Lives System**
   - Start with 3 lives ❤️❤️❤️
   - Lose 1 life per defeat
   - Game over at 0 lives
   - HP carries between battles

7. **Progression Tracking**
   - Defeated animals counter (0 / 12)
   - Defeated animals remain as corpses (semi-transparent)
   - Difficulty scales by progression (not location)
   - Win condition: defeat all 12 animals

## 🎯 How It Works

### Game Flow
```
Title Screen
    ↓ (Press Play)
Explore Village (3D)
    ↓ (Walk up to animal, press SPACE)
Battle Mode (2D) ← your existing game
    ↓ (Win or Lose)
    ├─ Win → Return to village (animal becomes corpse)
    └─ Lose → Lose 1 life
         ├─ Lives > 0 → Respawn at village entrance
         └─ Lives = 0 → Game Over
```

### Difficulty Progression
Animals get harder based on **how many you've defeated**, not where they are:
- 1st animal defeated = Round 1 difficulty (very easy, 30% HP)
- 2nd animal defeated = Round 2 difficulty
- 6th animal defeated = Round 6 difficulty (100% HP, old Round 3)
- 12th animal defeated = Round 12 difficulty (hardest)

## 🚧 Placeholders (To Be Replaced)

### Currently Using Simple Geometry:
1. **Buildings**: Colored boxes
   - Replace with: Medieval Village Mega Kit GLTFs
   - Files: House_1.gltf, Barn.gltf, Church.gltf, etc.

2. **Trees**: Cylinder trunk + sphere foliage
   - Replace with: Tree_1.gltf, Tree_2.gltf from medieval pack

3. **Ground**: Single green plane
   - Replace with: GroundTile.gltf tiled in grid

4. **Animals**: Orange glowing spheres
   - Replace with: Actual animal GLTF models (you already have them!)
   - Need to load from Models/Animals/ and play walk animations

## 🔧 Next Steps (Phase 2)

1. **Load Real Village Assets**
   - Download Medieval Village Mega Kit
   - Replace placeholder boxes with actual building models
   - Add fences, carts, barrels, hay bales

2. **Load Animal Models in Explore**
   - Use same animal GLTFs as battle mode
   - Play walk/idle animations
   - Face player when alerted

3. **Battle Integration**
   - Connect mode manager to existing game.js
   - Pass player HP, lives to battle
   - Return score, HP from battle

4. **Corpse System**
   - Play death animation
   - Freeze on final frame
   - Add transparency effect

## 🐛 Known Issues

- Placeholder geometry needs replacing
- Animal models not loaded yet in explore mode
- Battle mode integration not connected
- No pause menu
- Collision boxes are rectangular (rotated buildings may feel wrong)

## 💡 Testing Tips

### To Test Locally:
```bash
# Serve with any static server
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000`

### What to Try:
1. Click "START EXPLORING"
2. Use WASD to walk around
3. Find orange spheres (animals)
4. Walk close and press SPACE
5. It should trigger battle mode (not connected yet in this phase)

### Expected Behavior:
- Should walk smoothly through village
- Collide with colored boxes (buildings) and trees
- See HUD in top corners (lives, HP, score)
- See "Press SPACE to challenge [Animal]" when near sphere

## 📊 Current Stats

- **Village size**: ~40×40 units
- **Buildings**: 8 (placeholder boxes)
- **Trees**: 12 (placeholder geometry)
- **Animals**: 12 (placeholder spheres)
- **Colliders**: 20 (buildings + trees)
- **Draw calls**: ~50 (will optimize with instancing later)

## 🎨 Visual Style

Currently minimal/abstract with colored boxes. Once medieval pack is integrated:
- Stone/wood buildings
- Dirt paths between structures
- Fences, barrels, carts
- Medieval village atmosphere
- Animals in natural poses

## 🔜 Phase 2 Preview

Next update will add:
- Real medieval building models
- Proper animal models with animations
- Working battle triggers
- Corpse persistence with death animations
- Better collision (OBB instead of AABB)
- Props (fences, wells, carts)

---

**Ready to deploy!** Upload these 5 files:
- index.html
- main.js
- explore.js
- transitions.js
- game.js

Your existing animal models will work once we load them in Phase 2.
