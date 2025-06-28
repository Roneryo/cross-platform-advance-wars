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

export function drawCursor(scene: Scene, x: number, y: number): void {
  cursorPosition(scene, x, y);
}

function cursorPosition(scene: Scene, x: number, y: number): void {
  let lld_cord = y + 20;

  //left_line_cord
  let ll_cord = x - 16;
  let rl_cord = x + 16;
  // ╔╗
  // ╚╝
  //----right lines

  // //----left lines
  // ╔
  let v_l_line_down = scene.add.line(ll_cord, y, 0, -6, 0, 1, 0x00000, 1);
  let h_r_line_down = scene.add.line(rl_cord, y + 15, 0, 0, -6, 1, 0x00000, 1);

  // ╚
  let v_l_line_up = scene.add.line(ll_cord, lld_cord, 0, -6, 0, 1, 0x00000, 1);
  let h_r_line_up = scene.add.line(rl_cord, y - 15, 0, 0, -6, 1, 0x00000, 1);

  // ╝
  let v_line_down = scene.add.line(rl_cord, lld_cord, 0, -6, 0, 1, 0x00000, 1);
  let h_l_line_down = scene.add.line(x - 8, y - 15, 0, 0, -6, 1, 0x00000, 1);

  // ╗
  let v_right_line_up = scene.add.line(rl_cord, y, 0, -6, 0, 1, 0x00000, 1);
  let h_l_line_up = scene.add.line(x - 8, y + 15, 0, 0, -6, 1, 0x00000, 1);

  // let h_l_line_down = scene.add.line(x - 16, y + 15, 0, 0, -6, 0, 0x00000, 1);
  // let h_l_line_up = scene.add.line(x - 16, y - 15, 0, 0, -6, 0, 0x00000, 1);
}
