import { MenuScene } from "../scenes/menu-scene";

import { cursorPosition } from "./Periferics/MouseEvents";
import calculateGridPosition from "../utils/Map/grid";
// import { calculateGridPosition } from "./Periferics/KeyboardEvents";

export default function inputHandler(scene: MenuScene): void {
  scene.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");
  scene.input.keyboard.on("keydown-A", () => {
    console.log("A presionado");
  });
  scene.input.keyboard.on("keydown-LEFT", () => {
    console.log("LEFT presionado");
    scene.character.pixelX -= 16;
  });
  scene.input.keyboard.on("keydown-RIGHT", () => {
    console.log("RIGHT presionado");
    scene.character.pixelX += 16;
  });
  scene.input.keyboard.on("keydown-UP", () => {
    console.log("UP presionado");
    scene.character.pixelY -= 16;
  });
  scene.input.keyboard.on("keydown-DOWN", () => {
    console.log("UP presionado");
    scene.character.pixelY += 16;
  });
  scene.input.on("pointerdown", (e: any) => {
    if (e.button === 0) {
      // let { x, y } = e.position;
      // let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y)
      // console.log("left clickdown", e);
      // console.log(this);
      // let copyTile = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World");
    }
  });
  scene.input.on("pointerup", (e: Phaser.Input.Pointer) => {
    if (e.button === 0) {
      let { x, y } = e.position;
      let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
      // let tile = scene.data;
      // console.log(tile);
      // console.log(scene)
      // console.log(tile.setFlipX(!tile.flipX))
      // console.log(gridMoveX, gridMoveY);

      let unit = scene.add.sprite(
        gridMoveX * 32 + 12,
        gridMoveY * 32 + 12,
        "idle"
      );
      unit.setScale(2);
      unit.play("idle");
      scene.units.push(unit);
      console.log(scene.units);
      // aTile.alpha===1 ? aTile.alpha=0 : aTile.alpha=1
      // console.log(copyTile)
      // let text = this.make.text({ text: "hola mundo", x: gridMoveX, y: gridMoveY, style: { color: "black" } });
      // let sprite = this.make.tilemap({key:"map",width:48,height:432,tileWidth:16,tileHeight:16})
      //this.make.tileSprite({ x: gridMoveX+13, y: gridMoveY+13, key: "idleRed-tiles", width: 16, height: 16 }, true)
    }
  });
  scene.input.on("pointermove", (e: any) => {
    cursorPosition(e, scene.sprite);
  });
}
