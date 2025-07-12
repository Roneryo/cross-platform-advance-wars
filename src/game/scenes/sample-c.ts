import addSceneNavigationControls from "../gameObjects/Periferics/KeyboardEvents";

export class SceneC extends Phaser.Scene {
  constructor() {
    super({ key: "SceneC", active: false });
  }
  init(): void {}
  preload(): void {}
  create(): void {
    let graphics = this.add.graphics();
    graphics.fillStyle(0xffcc33, 1);
    graphics.fillRect(100, 200, 600, 300);
    graphics.fillRect(300, 100, 100, 100);
    this.add.text(320, 110, "C", { font: "96px Courier", color: "#000000" });

    // Agregar texto de instrucciones
    this.add.text(
      50,
      50,
      "ESC: Volver al menú | 1: SceneA | 2: SceneB | 3: SceneC",
      {
        font: "16px Arial",
        color: "#ffffff",
      }
    );

    // Agregar controles de navegación
    addSceneNavigationControls(this);
  }
}
