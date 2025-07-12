import addSceneNavigationControls from "../gameObjects/Periferics/KeyboardEvents";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene", active: false });
  }
  init(): void {}
  preload(): void {}
  create(): void {
    // graphics.fillStyle(0xff3300, 1);
    // graphics.fillRect(100, 200, 600, 300);
    // graphics.fillRect(100, 100, 100, 100);
    this.plane(1000);
    this.add.text(120, 110, "A", { font: "96px Courier", color: "#000000" });

    // Agregar texto de instrucciones
    this.add.text(
      50,
      50,
      "ESC: Ir al mapa de prueba | 1: MenuScene | 2: SceneB | 3: SceneC",
      {
        font: "16px Arial",
        color: "#ffffff",
      }
    );

    // Agregar controles de navegación
    addSceneNavigationControls(this);
  }
  plane(duration: number): void {
    const width = this.scale.width * 0.9;
    const height = this.scale.height * 0.6;
    const x = (this.scale.width - width) / 2;
    const y = (this.scale.height - height) / 2;
    const depth = x; // Profundidad del efecto 3D

    const g = this.add.graphics();
    // let progress = 0;
    let showingFront = true;

    const draw = (t: number) => {
      g.clear();

      // Interpolación para simular el flip
      // const flip = Math.abs(Math.cos(Math.PI * t));
      const skew = depth * Math.sin(Math.PI * t);

      // Cambia el color cuando pasa la mitad
      if (t > 0.5 && showingFront) {
        showingFront = false;
      } else if (t <= 0.5 && !showingFront) {
        showingFront = true;
      }

      // Cara visible
      g.fillStyle(showingFront ? 0xff3300 : 0x00ff00, 1);
      g.beginPath();
      g.moveTo(x + skew, y);
      g.lineTo(x + width - skew, y);
      g.lineTo(x + width - skew, y + height);
      g.lineTo(x + skew, y + height);
      g.closePath();
      g.fillPath();

      // Bordes para simular 3D
      g.lineStyle(2, 0x000000, 1);
      g.strokeRect(x + skew, y, width - 2 * skew, height);
    };

    // Tween para animar el flip
    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration,
      onUpdate: (tween) => {
        draw(tween.getValue());
      },
      onComplete: () => {
        // Opcional: puedes dejar la cara trasera o volver a la frontal
      },
    });
  }
}
