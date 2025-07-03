import Phaser from "phaser";
import { SceneA } from "./scenes/sample-a";
import { SceneB } from "./scenes/sample-b";
import { SceneC } from "./scenes/sample-c";
import { GameMap } from "./scenes/gameMap";

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "ExampleGame",
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "app",
  transparent: false,
  scene: [GameMap, SceneA, SceneB, SceneC],
  input: {
    keyboard: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  backgroundColor: "#392542",
  render: { pixelArt: true, antialias: false },
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    autoCenter: Phaser.Scale.NO_CENTER,

    // `fullscreenTarget` must be defined for phones to not have
    // a small margin during fullscreen.
    fullscreenTarget: "app",
    expandParent: false,
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

let game = () => {
  window.addEventListener("load", () => {
    // Expose `_game` to allow debugging, mute button and fullscreen button
    (window as any)._game = new Game(GameConfig);
  });
};
export default game;
