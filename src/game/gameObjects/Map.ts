import "phaser";
import { AnimatedTile } from "../utils/AnimatedTile";
import { loadMapTiles, preloadMap } from "../utils/Map/draw";

export class Map extends Phaser.Tilemaps.MapData {
  public tilemapKey!: string;
  public tilesetKey!: string;
  public grid!: Phaser.Tilemaps.Tilemap;
  public animatedTiles!: AnimatedTile[];

  public tilesetURL!: { name: string; image: string }[];
  public spriteSheet!: { name: string; image: string }[];

  constructor() {
    super();
    loadMapTiles(this);
  }
  public init(): void {
    this.tilemapKey = "game/assets/tilemaps/customMap.json";
    this.tilesetKey = "game/assets/tilesets/";
    this.animatedTiles = [];
  }
  public preload(scene: Phaser.Scene): void {
    preloadMap(this, scene);
  }
  update(time: number, delta: number): void {
    this.animatedTiles.forEach((tile) => tile.update(delta));
  }

  public getTileSet(id: number) {
    return this.tilesets[id];
  }
  public getTilesetURL(key: string) {
    return this.tilesetURL.find((tileset) => tileset.image === key);
  }
}
