import { muteAll, unmuteAll } from "../../utils/Music/sfx";

export function keyboardEvents(scene: Phaser.Scene): void {
  scene.input.keyboard?.on("keydown-M", () => {
    muteAll(scene);
    console.log("Audio silenciado");
  });

  scene.input.keyboard?.on("keydown-U", () => {
    unmuteAll(scene);
    console.log("Audio activado");
  });
}
