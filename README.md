# ✦ Spell Forge — Word RPG

A casual mobile word-RPG prototype where you defeat monsters by spelling English words from their letter tiles. Built as a pure HTML/JS/CSS prototype to validate the core combat loop before a React Native port.

## Play

Open [`index.html`](./index.html) in any modern browser, or visit the [live demo](https://YOUR_USERNAME.github.io/spell-forge/) once GitHub Pages is enabled.

## Gameplay

- Tap letter tiles to build words from a monster's 8-letter set
- Longer words deal exponentially more damage (3 letters = 10 dmg, 8+ letters = 200 dmg)
- Each monster has a hidden "boss word" that deals a critical 90 damage
- Chain 2+ valid casts in a row for a combo multiplier (+25% per combo tier)
- Survive three monsters: Goblin Grunt → Stone Golem → Ancient Dragon

## Features

- **Three hand-animated 3D monsters** with idle bobbing, windup → attack lunges, hurt recoil, and death animations
- **Parallax scene backgrounds** — moonlit forest, nebula ruins, volcanic lava fields
- **Procedural chiptune audio engine** (Web Audio API, zero dependencies) — battle loop, victory fanfare, defeat dirge, impact SFX
- **~500-word dictionary** covering all three monster letter sets
- **Particle effects** — spell projectiles, impact bursts, damage numbers, screen flashes, camera shake on crits

## Tech

- Vanilla HTML / CSS / JavaScript — no build step, no bundler, no dependencies
- Web Audio API for procedural music and SFX
- SVG for monster sprites and scene backgrounds
- CSS transforms for all 3D animations

## Next steps

- Port to React Native (Expo) for iOS / Android distribution
- Add hero collection / gacha card pack system
- Add idle offline progression
- Add dungeon floors beyond the first three monsters
- Localize for target markets (Vietnamese, Portuguese-BR, Turkish, Indonesian)

## License

MIT
