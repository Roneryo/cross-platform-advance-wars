import { GameMap } from "../scenes/gameMap";

import { cursorPosition } from "./Periferics/MouseEvents";
import calculateGridPosition, { drawCursor } from "../utils/Map/grid";
// import { calculateGridPosition } from "./Periferics/KeyboardEvents";
let u_exist = false;
// Función para cambiar de escena
export function changeScene(scene: Phaser.Scene, targetSceneKey: string): void {
  console.log(`Cambiando a escena: ${targetSceneKey}`);
  scene.scene.start(targetSceneKey);
}

// Función para agregar controles de navegación a cualquier escena
export function addSceneNavigationControls(scene: Phaser.Scene): void {
  scene.input.keyboard.on("keydown-ONE", () => {
    console.log("Tecla 1 presionada - Cambiando a SceneA");
    changeScene(scene, "SceneA");
  });

  scene.input.keyboard.on("keydown-TWO", () => {
    console.log("Tecla 2 presionada - Cambiando a SceneB");
    changeScene(scene, "SceneB");
  });

  scene.input.keyboard.on("keydown-THREE", () => {
    console.log("Tecla 3 presionada - Cambiando a SceneC");
    changeScene(scene, "SceneC");
  });

  scene.input.keyboard.on("keydown-ESC", () => {
    console.log("Tecla ESC presionada - Volviendo al menú");
    changeScene(scene, "GameMap");
  });
}

export default function inputHandler(scene: GameMap): void {
  scene.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");

  // Controles de cambio de escena
  addSceneNavigationControls(scene);

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
      console.log("left clickdown", e);
    }
  });

  scene.input.on("pointerup", (e: Phaser.Input.Pointer) => {
    if (e.button === 0) {
      let { x, y } = e.position;
      let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
      let unit_x = gridMoveX * 32 + 16;
      let unit_y = gridMoveY * 32 + 16;

      console.log(unit_x, unit_y);
      if (!u_exist) {
        let unit = scene.add.sprite(unit_x, unit_y, "idle");
        unit.setScale(2);
        unit.play("idle");
        scene.units.push(unit);
        console.log("Unit created at position:", unit_x, unit_y);
        u_exist = true;
      }
    }
  });
  scene.input.on("pointermove", (e: any) => {
    cursorPosition(e, scene.sprite, scene);
    let { x, y } = e.position;
    let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
    let unit_x = gridMoveX * 32 + 16;
    let unit_y = gridMoveY * 32 + 16;

    drawCursor(scene, unit_x, unit_y);

    scene.units.forEach((unit: Phaser.GameObjects.Sprite) => {
      if (unit.x === unit_x && unit.y === unit_y) {
        console.log("Unit already exists at this position");
        u_exist = true;
      } else {
        u_exist = false;
      }
    });
  });
}
