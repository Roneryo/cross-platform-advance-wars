import { GameObjects } from "phaser";
import { createLevelWithTileMap } from "../utils/Map/draw";
// Constants for grid and tile dimensions

import { Map } from "../gameObjects/Map.ts";
import inputHandler from "../gameObjects/InputManager.ts";
import { setLimiter } from "../utils/Map/grid.ts";
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
  }
  create(): void {
    createLevelWithTileMap(this, this.map);
    this.character = this.map.animatedTiles[0].tile;
    console.log(this.map.grid);
    console.log(this.character.x, this.character.y);
    inputHandler(this);
    this.grid = setLimiter(this.grid, this);
  }
  update(time: number, delta: number): void {
    this.map.update(time, delta);
    // console.log(delta);
  }
  checkMouse(): void {
    let x = Math.round(this.input.mousePointer.x);
    let y = Math.round(this.input.mousePointer.y);
    console.log(x, y);
  }
}
