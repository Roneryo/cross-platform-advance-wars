import { GameObjects } from "phaser";
import { createLevelWithTileMap } from "../utils/Map/draw.ts";
// Constants for grid and tile dimensions

import { Map } from "../gameObjects/Map.ts";
import inputHandler from "../gameObjects/InputManager.ts";
import { setLimiter } from "../utils/Map/grid.ts";
import {
  //  preloadSFX,
  preloadMusic,
  //  playSFX,
  playSFXWithVolume,
  setGlobalVolume,
  //  muteAll,
  //  unmuteAll,
} from "../utils/Music/sfx.ts";
export class GameMap extends Phaser.Scene {
  public map: Map;
  public character: Phaser.Tilemaps.Tile;
  public tile: any;
  public text: GameObjects.Text;
  public grid: GameObjects.Grid;
  public sprite: Phaser.Tilemaps.Tilemap;
  public units: GameObjects.Sprite[];
  constructor() {
    super({
      key: "GameMap",
    });
    this.map = new Map();
  }
  init() {
    this.map.init();
    this.units = [];
  }

  preload(): void {
    this.map.preload(this);
    this.load.tilemapTiledJSON("map", this.map.tilemapKey);
    // Precargar efectos de sonido y música
    //preloadSFX(this);
    preloadMusic(this);
  }
  create(): void {
    createLevelWithTileMap(this, this.map);
    this.character = this.map.animatedTiles[0].tile;
    console.log(this.map.grid);
    console.log(this.character.x, this.character.y);
    inputHandler(this);
    this.grid = setLimiter(this.grid, this);
    setGlobalVolume(this, 0.7);
    addSceneNavigationControls(this);
  }
  update(time: number, delta: number): void {
    this.map.update(time, delta);
    // console.log(delta);
  }
  checkMouse(): void {
    let x = Math.round(this.input.mousePointer.x);
    let y = Math.round(this.input.mousePointer.y);
    console.log(x, y);

    // Ejemplo: Reproducir sonido al hacer clic con volumen reducido
    playSFXWithVolume(this, "cursor_sfx", 0.5);
  }
}

function addSceneNavigationControls(scene: Phaser.Scene): void {
  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("GameMap");
  });

  scene.input.keyboard.on("keydown-ONE", () => {
    scene.scene.start("SceneA");
  });

  scene.input.keyboard.on("keydown-TWO", () => {
    scene.scene.start("SceneB");
  });

  scene.input.keyboard.on("keydown-THREE", () => {
    scene.scene.start("SceneC");
  });
}
