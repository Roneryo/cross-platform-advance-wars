import { MenuScene } from "../scenes/menu-scene";

/*custom methods*/
function cursorPosition({ x, y }: Phaser.Input.Pointer, sprite: Phaser.Tilemaps.Tilemap) {
  let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);

  if (sprite === undefined) {
    console.log(gridMoveX, gridMoveY)
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
function calculateGridPosition(x: number, y: number): { gridMoveX: number, gridMoveY: number } {
  let gridMoveX = (Math.floor(Math.floor(x) / 32) * 32) / 32;
  let gridMoveY = (Math.floor(Math.floor(y) / 32) * 32) / 32;
  // x = Math.round((Math.round(x) / 32));
  // y = Math.round((Math.round(y) / 32));
  return { gridMoveX, gridMoveY }
}
export default function inputHandler(scene: MenuScene): void {
  scene.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");
  scene.input.keyboard.on("keydown-A", () => {
    console.log('A presionado')
  })
  scene.input.keyboard.on("keydown-LEFT", () => {
    console.log('LEFT presionado')
    scene.character.pixelX -= 16;
  })
  scene.input.keyboard.on("keydown-RIGHT", () => {
    console.log('RIGHT presionado')
    scene.character.pixelX += 16;
  })
  scene.input.keyboard.on("keydown-UP", () => {
    console.log('UP presionado')
    scene.character.pixelY -= 16;
  })
  scene.input.keyboard.on("keydown-DOWN", () => {
    console.log('UP presionado')
    scene.character.pixelY += 16;
  })
  scene.input.on('pointerdown', (e: any) => {
    if (e.button === 0) {
      // let { x, y } = e.position;
      // let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y)

      // console.log("left clickdown", e);
      // console.log(this);
      // let copyTile = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World");

    }
  })
  scene.input.on('pointerup', (e: Phaser.Input.Pointer) => {
    if (e.button === 0) {
      let { x, y } = e.position;
      let { gridMoveX, gridMoveY } = calculateGridPosition(x, y)
      let tile = scene.data
      // console.log(tile);
      // console.log(scene)
      // console.log(tile.setFlipX(!tile.flipX))
      console.log(gridMoveX, gridMoveY);
/*
        let unit = scene.add.sprite(gridMoveX,gridMoveY,"animatedUnits");
        unit.setScale(2);
        unit.play("leftRun")
        scene.units.push(unit);
*/      let aTile = scene.map.grid.getTileAt(gridMoveX, gridMoveY);

      // aTile.alpha===1 ? aTile.alpha=0 : aTile.alpha=1


      try {
        if (aTile.alpha === 1) {
          aTile.alpha = 0;
          let unit = scene.add.sprite((gridMoveX * 32) + 12, (gridMoveY * 32) + 8, "animatedUnits");
          unit.setScale(2);
          unit.play("leftRun")
          scene.units.push(unit);

        } else {
          aTile.alpha = 1;
          scene.units.forEach(unit => {
            unit.destroy();
          });
          scene.units = [];
        }
        console.log(aTile.alpha);

      } catch (error) {
        // console.log(error)
      }
      // console.log(copyTile)
      // let text = this.make.text({ text: "hola mundo", x: gridMoveX, y: gridMoveY, style: { color: "black" } });
      // let sprite = this.make.tilemap({key:"map",width:48,height:432,tileWidth:16,tileHeight:16})
      //this.make.tileSprite({ x: gridMoveX+13, y: gridMoveY+13, key: "idleRed-tiles", width: 16, height: 16 }, true)


    }
    // console.log(e);
  })
  scene.input.on('pointermove', (e: any) => {
    cursorPosition(e,scene.sprite);

  })

}
