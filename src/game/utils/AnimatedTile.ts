import { Map } from "../gameObjects/Map";

export type TilesetTileData = {
  [key: number]: { animation?: TileAnimationData };
};

export type TileAnimationData = Array<{ duration: number; tileid: number }>;

/**
 * Represents an animated tile in a Phaser tilemap.
 * Handles updating the tile's index based on animation data and elapsed time.
 *
 * @remarks
 * This class is useful for animating individual tiles in a tilemap using custom animation data.
 *
 * @example
 * ```typescript
 * const animatedTile = new AnimatedTile(tile, animationData, firstgid);
 * animatedTile.update(delta);
 * ```
 */
export class AnimatedTile {
  static makeTileAnimations(
    dessert_tilesets: Phaser.Tilemaps.Tileset,
    grid: Phaser.Tilemaps.Tilemap
  ) {
    throw new Error("Method not implemented.");
  }
  public tile: Phaser.Tilemaps.Tile;
  private tileAnimationData: TileAnimationData;
  private firstgid: number;
  private elapsedTime: number;
  private animationDuration: number;

  constructor(
    tile: Phaser.Tilemaps.Tile,
    tileAnimationData: TileAnimationData,
    firstgid: number
  ) {
    this.tile = tile;
    this.tileAnimationData = tileAnimationData;
    this.firstgid = firstgid;
    this.elapsedTime = 0;
    this.animationDuration =
      tileAnimationData[0].duration * tileAnimationData.length;
  }

  public update(delta: number): void {
    this.elapsedTime += delta;
    this.elapsedTime %= this.animationDuration;

    const animatonFrameIndex = Math.floor(
      this.elapsedTime / this.tileAnimationData[0].duration
    );

    this.tile.index =
      this.tileAnimationData[animatonFrameIndex].tileid + this.firstgid;
  }
}
/**
 * Creates and registers animated tiles for a given tileset and tilemap.
 *
 * Iterates through the tile data in the provided tileset and checks each tile in all layers of the tilemap.
 * For each tile that matches an animated tile definition, an `AnimatedTile` instance is created and added to the `map.animatedTiles` array.
 *
 * @param tileSet - The Phaser tileset containing tile data and animation definitions.
 * @param tileMap - The Phaser tilemap containing layers and tile instances.
 * @param map - The game map object that holds the `animatedTiles` array for tracking animated tiles.
 */
export function makeTileAnimations(
  tileSet: Phaser.Tilemaps.Tileset,
  tileMap: Phaser.Tilemaps.Tilemap,
  map: Map
): void {
  const tileData = tileSet.tileData as TilesetTileData;
  for (let tileid in tileData) {
    tileMap.layers.forEach((layer) => {
      if (
        layer.tilemapLayer === null ||
        layer.tilemapLayer.type === "StaticTilemapLayer"
      )
        return;
      layer.data.forEach((tileRow: any) => {
        tileRow.forEach((tile: any) => {
          if (tile.index - tileSet.firstgid === parseInt(tileid, 10)) {
            map.animatedTiles.push(
              new AnimatedTile(
                tile,
                tileData[tileid].animation as TileAnimationData,
                tileSet.firstgid
              )
            );
          }
        });
      });
    });
  }
}
