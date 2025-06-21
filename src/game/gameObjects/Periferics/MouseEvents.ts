import calculateGridPosition from "../../utils/Map/grid";
/*custom methods*/
let prevx = 0;
let prevy = 0;
export function cursorPosition(
  { x, y }: Phaser.Input.Pointer,
  sprite: Phaser.Tilemaps.Tilemap
): void {
  let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);

  if (sprite === undefined) {
    if (prevx === gridMoveX && prevy === gridMoveY) {
      return;
    } else {
      console.log(`gridMoveX:${gridMoveX}, gridMoveY:${gridMoveY}`);
    }
    prevy = gridMoveY;
    prevx = gridMoveX;

    // this.add.sprite()
    // this.sprite = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World")

    // this.text = this.make.text({ text: "hola mundo", x, y, style: { color: "black" } })
    // this.sprite = this.add.rectangle(gridMoveX, gridMoveY, 16, 16, 12)
  } else {
    console.log("xd");
    // console.log(this.sprite)

    // this.sprite.setDisplayOrigin(gridMoveX, gridMoveY)
    // this.sprite.x = gridMoveX;
    // this.sprite.y = gridMoveY;
  }
}
