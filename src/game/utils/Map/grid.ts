import { Scene } from "phaser";

const TILE_SIZE = 32;
const GRID_WIDTH = 32;
const GRID_HEIGHT = 20;
const GRID_CENTER_X = TILE_SIZE * (GRID_WIDTH / 2);
const GRID_CENTER_Y = TILE_SIZE * (GRID_HEIGHT / 2);

export default function calculateGridPosition(
  x: number,
  y: number
): { gridMoveX: number; gridMoveY: number } {
  let gridMoveX =
    (Math.floor(Math.floor(x) / TILE_SIZE) * TILE_SIZE) / TILE_SIZE;
  let gridMoveY =
    (Math.floor(Math.floor(y) / TILE_SIZE) * TILE_SIZE) / TILE_SIZE;
  // x = Math.round((Math.round(x) / 32));
  // y = Math.round((Math.round(y) / 32));
  return { gridMoveX, gridMoveY };
}

export function setLimiter(
  grid: Phaser.GameObjects.Grid,
  scene: Scene
): Phaser.GameObjects.Grid {
  grid = scene.add.grid(
    GRID_CENTER_X, // grid center x
    GRID_CENTER_Y, // grid center y
    TILE_SIZE * GRID_WIDTH, // grid width
    TILE_SIZE * GRID_HEIGHT, // grid height
    TILE_SIZE, // cell width
    TILE_SIZE, // cell height
    0, // fill color
    0, // fill alpha
    1, // outline color
    0.1 // outline alpha
  );
  return grid.setScale(1);
}
