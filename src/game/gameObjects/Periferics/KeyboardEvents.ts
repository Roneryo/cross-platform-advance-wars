import { GameMap } from "../../scenes/gameMap";
import { muteAll, unmuteAll } from "../../utils/Music/sfx";

export function keyboardEvents(scene: GameMap): void {
  scene.input.keyboard?.on("keydown-M", () => {
    muteAll(scene);
    console.log("Audio silenciado");
  });

  scene.input.keyboard?.on("keydown-U", () => {
    unmuteAll(scene);
    console.log("Audio activado");
  });
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
  addSceneNavigationControls(scene);
}

export default function addSceneNavigationControls(scene: Phaser.Scene): void {
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

function changeScene(scene: Phaser.Scene, targetSceneKey: string): void {
  console.log(`Cambiando a escena: ${targetSceneKey}`);
  scene.scene.start(targetSceneKey);
}
