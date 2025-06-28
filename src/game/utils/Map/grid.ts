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

export function drawCursor(scene: Scene, x: number, y: number): Object {
  return squareCursorPosition(scene, x, y);
}

function squareCursorPosition(scene: Scene, x: number, y: number): Object {
  scene.children.list.forEach((obj) => {
    if (obj instanceof Phaser.GameObjects.Line) {
      obj.destroy();
    }
  });

  let lld_cord = y + 16; //left_line_down_cord

  //left_line_cord
  let ll_cord = x - 16;
  let rl_cord = x + 16;
  // ╔╗
  // ╚╝
  //----right lines

  // //----left lines
  // ╔
  let v_l_line_down = scene.add.line(ll_cord, y, 0, -6, 0, 0, 0x00000, 1);
  let h_l_line_down = scene.add.line(x, y - 16, 0, 0, -6, 0, 0x00000, 1);

  // ╚
  let v_l_line_up = scene.add.line(ll_cord, lld_cord, 0, -6, 0, 0, 0x00000, 1);
  let h_l_line_up = scene.add.line(x, y + 16, 0, 0, -6, 0, 0x00000, 1);

  // // ╝
  let v_line_down = scene.add.line(rl_cord, lld_cord, 0, -6, 0, 0, 0x00000, 1);
  let h_r_line_down = scene.add.line(rl_cord, y + 16, 0, 0, -6, 0, 0x00000, 1);

  // // ╗
  let v_right_line_up = scene.add.line(rl_cord, y, 0, -6, 0, 0, 0x00000, 1);
  let h_r_line_up = scene.add.line(rl_cord, y - 16, 0, 0, -6, 0, 0x00000, 1);

  // v_l_line_down,h_l_line_down,v_l_line_up,h_l_line_up,v_line_down,h_r_line_down

  let cursor = {
    l_s_line: [v_l_line_down, h_l_line_down, v_l_line_up, h_l_line_up],
    r_s_line: [v_line_down, h_r_line_down, v_right_line_up, h_r_line_up],
  };
  console.log((v_l_line_down.x, v_l_line_down.y),(h_l_line_down.x, h_l_line_down.y),(v_l_line_up.x, v_l_line_up.y),(h_l_line_up.x, h_l_line_up.y),(v_line_down.x, v_line_down.y),(h_r_line_down.x, h_r_line_down.y));
  // console.log("Cursor created at position:", x, y);
  return cursor;
}
