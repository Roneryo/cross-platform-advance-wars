export default function calculateGridPosition(
  x: number,
  y: number
): { gridMoveX: number; gridMoveY: number } {
  let gridMoveX = (Math.floor(Math.floor(x) / 32) * 32) / 32;
  let gridMoveY = (Math.floor(Math.floor(y) / 32) * 32) / 32;
  // x = Math.round((Math.round(x) / 32));
  // y = Math.round((Math.round(y) / 32));
  return { gridMoveX, gridMoveY };
}
