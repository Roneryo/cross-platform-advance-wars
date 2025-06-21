import { GameObjects } from "phaser";

// Constants for grid and tile dimensions
const TILE_SIZE = 32;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const GRID_CENTER_X = TILE_SIZE * (GRID_WIDTH / 2);
const GRID_CENTER_Y = TILE_SIZE * (GRID_HEIGHT / 2);

import { Map } from "../gameObjects/Map.ts";
import inputHandler from "../gameObjects/InputManager.ts";
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
    this.map.createLevelWithTileMap(this);
    this.character = this.map.animatedTiles[0].tile;
    console.log(this.map.grid);
    console.log(this.character.x, this.character.y);
    inputHandler(this);
    this.grid = this.add.grid(
      GRID_CENTER_X, // grid center x
      GRID_CENTER_Y, // grid center y
      TILE_SIZE * GRID_WIDTH, // grid width
      TILE_SIZE * GRID_HEIGHT, // grid height
      TILE_SIZE, // cell width
      TILE_SIZE, // cell height
      0, // fill color
      0, // fill alpha
      100, // outline color
      1 // outline alpha
    );
    this.grid.setScale(1);
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
