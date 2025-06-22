import { GameObjects } from "phaser";
import { createLevelWithTileMap } from "../utils/Map/draw";
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
import { keyboardEvents } from "../gameObjects/Periferics/KeyboardEvents.ts";
export class MenuScene extends Phaser.Scene {
  public map: Map;
  public character: Phaser.Tilemaps.Tile;
  public tile: any;
  public text: GameObjects.Text;
  public grid: GameObjects.Grid;
  public sprite: Phaser.Tilemaps.Tilemap;
  public units: GameObjects.Sprite[];
  constructor() {
    super({
      key: "MenuScene",
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
    keyboardEvents(this);
    setGlobalVolume(this, 0.7);

    // Agregar texto de instrucciones para navegación
    this.add.text(10, 10, "Controles de navegación:", {
      font: "18px Arial",
      color: "#000000",
      backgroundColor: "#ffffff",
      padding: { x: 10, y: 5 },
    });

    this.add.text(10, 40, "Tecla 1: Ir a SceneA", {
      font: "14px Arial",
      color: "#000000",
    });

    this.add.text(10, 60, "Tecla 2: Ir a SceneB", {
      font: "14px Arial",
      color: "#000000",
    });

    this.add.text(10, 80, "Tecla 3: Ir a SceneC", {
      font: "14px Arial",
      color: "#000000",
    });

    this.add.text(10, 100, "ESC: Volver al menú (desde otras escenas)", {
      font: "14px Arial",
      color: "#000000",
    });
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
