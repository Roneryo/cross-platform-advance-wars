import { Map } from "../../gameObjects/Map";
import { makeTileAnimations } from "../../utils/AnimatedTile";
import { createSpriteAnimations } from "../../gameObjects/Units";
/**
 * Loads and assigns tile and sprite sheet information to the provided map object.
 *
 * This function sets the `tilesetURL` property of the map with an array of tile set definitions,
 * each containing a `name` and an associated image file. It also initializes the `spriteSheet`
 * property as an array and populates it with sprite sheet definitions.
 *
 * @param map - The map object to which tile sets and sprite sheets will be assigned.
 */
export function loadMapTiles(map: Map): void {
  map.tilesetURL = [
    { name: "dessert-tiles", image: "DESSERT2.png" },
    { name: "sea-tiles", image: "MAR2.png" },
    { name: "idleRed-tiles", image: "IdleRed.png" },
    { name: "animated", image: "AnimatedUnits.png" },
  ];
  map.spriteSheet = [];
  map.spriteSheet.push({
    name: "animatedUnits",
    image: "AnimatedUnits.png",
  });
  map.spriteSheet.push({ name: "IdleRed", image: "IdleRed.png" });
}

/**
 * Preloads all tileset images and sprite sheets required for the given map into the specified Phaser scene.
 *
 * @param map - The map object containing tileset and sprite sheet information to preload.
 * @param scene - The Phaser.Scene instance where assets will be loaded.
 *
 * @remarks
 * - Sets the asset loading path to the `src` directory relative to the current window location.
 * - Iterates through `map.tilesetURL` to load each tileset image.
 * - Iterates through `map.spriteSheet` to load each sprite sheet with a frame size of 16x16 pixels.
 */
export function preloadMap(map: Map, scene: Phaser.Scene): void {
  scene.load.setPath(window.location + "src");
  map.tilesetURL.forEach((tileURL) => {
    scene.load.image(tileURL.name, `${map.tilesetKey}${tileURL.image}`);
  });
  map.spriteSheet.forEach((spriteURL) => {
    scene.load.spritesheet(
      spriteURL.name,
      `${map.tilesetKey}${spriteURL.image}`,
      { frameWidth: 16, frameHeight: 16 }
    );
  });
}

/**
 * Creates and configures a level in the given Phaser scene using a tilemap.
 *
 * This function initializes the tilemap, adds tilesets, creates tilemap layers,
 * scales them, and sets up tile animations. It also logs the available layers for debugging.
 *
 * @param scene - The Phaser.Scene instance where the tilemap and layers will be created.
 * @param map - The custom Map object containing tilemap data and utility methods.
 *
 * @remarks
 * - Assumes that the tilemap and tileset assets ("map", "DESSERT2", "MAR2", etc. are preloaded.
 * - The function creates multiple layers (Sand, pipetrail, Trees, Above, Below, Sea, World)
 *   and scales them by a factor of 2.
 * - Tile animations are initialized for both dessert and sea tilesets.
 */
export function createLevelWithTileMap(scene: Phaser.Scene, map: Map): void {
  createSpriteAnimations(scene, "leftRun");
  createSpriteAnimations(scene, "rightRun");
  createSpriteAnimations(scene, "idle");
  map.grid = scene.make.tilemap({ key: "map" });
  // console.log(map);
  const dessert_tilesets: Phaser.Tilemaps.Tileset = map.grid.addTilesetImage(
    "DESSERT2",
    "dessert-tiles"
  );
  const sea_tilesets: Phaser.Tilemaps.Tileset = map.grid.addTilesetImage(
    "MAR2",
    "sea-tiles"
  );
  map.grid.addTilesetImage("IdleRed", "idleRed-tiles");

  const layers = map.grid.layers; // map.grid is your Tilemap
  layers.forEach((layer, index) => {
    console.log(`Layer ID: ${index}, Layer Name: ${layer.name}`);
  });

  const Sand = map.grid.createLayer(0, dessert_tilesets, 0, 0);
  const pipetrail = map.grid.createLayer(1, dessert_tilesets, 0, 0);
  const Trees = map.grid.createLayer(2, dessert_tilesets, 0, 0);
  const Above = map.grid.createLayer(3, dessert_tilesets, 0, 0);
  const Below = map.grid.createLayer(4, dessert_tilesets, 0, 0);
  const Sea = map.grid.createLayer(5, sea_tilesets, 0, 0);
  const World = map.grid.createLayer(6, dessert_tilesets, 0, 0);
  Sand.setScale(2);
  pipetrail.setScale(2);
  Trees.setScale(2);
  Above.setScale(2);
  Below.setScale(2);
  Sea.setScale(2);
  World.setScale(2);
  makeTileAnimations(dessert_tilesets, map.grid, map);
  makeTileAnimations(sea_tilesets, map.grid, map);
}

/*
 //nivel por grid
  createLevelWithGrid(): void {
    const level = [
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 12, 14, 14, 13, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
    ];
    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16, height: 30, width: 30 });
    const tiles = map.addTilesetImage("dessert-tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    layer.setScale(2.5, 2.5);
  }
*/
