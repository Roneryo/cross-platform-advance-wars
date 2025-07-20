import Phaser from "phaser";
import {gameConfig} from "./config";

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

let game = () => {
  window.addEventListener("load", () => {
    // Expose `_game` to allow debugging, mute button and fullscreen button
    (window as any)._game = new Game();
  });
};
export default game;
