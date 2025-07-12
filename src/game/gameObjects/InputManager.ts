import { GameMap } from "../scenes/gameMap";

import { keyboardEvents } from "../gameObjects/Periferics/KeyboardEvents.ts";
import { mouseBehavior } from "./Periferics/MouseEvents.ts";

// Función para cambiar de escena

// Función para agregar controles de navegación a cualquier escena

export default function inputHandler(scene: GameMap): void {
  scene.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");
  keyboardEvents(scene);
  mouseBehavior(scene);
  // Controles de cambio de escena
}
