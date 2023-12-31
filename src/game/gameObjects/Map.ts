import 'phaser'
import { AnimatedTile } from '../utils/AnimatedTile';
import { TilesetTileData } from '../utils/AnimatedTile';
import { TileAnimationData } from '../utils/AnimatedTile';

export class Map extends Phaser.Tilemaps.MapData {
    public tilemapKey!: string;
    public tilesetKey!: string;
    public grid!: Phaser.Tilemaps.Tilemap;
    public animatedTiles!: AnimatedTile[];

    private tilesetURL!: { name: string, image: string }[];
    private spriteSheet!: { name: string, image: string }[];

    constructor() {
        super();
        this.tilesetURL = [
            { name: "dessert-tiles", image: "DESSERT3.png" },
            { name: "sea-tiles", image: "MAR2.png" },
            { name: "idleRed-tiles", image: "IdleRed.png" },
            {name:"animated",image:"AnimatedUnits.png"}
        ]
        this.spriteSheet = [
            { name: "animatedUnits", image: "AnimatedUnits.png" }
        ]
    }
    public init(): void {
        this.tilemapKey = "game/assets/tilemaps/customMap.json";
        this.tilesetKey = "game/assets/tilesets/";
        this.animatedTiles = [];
    }
    public preload(scene: Phaser.Scene): void {
        console.log(scene.load.setPath(window.location+'src'));
        console.log(scene.load.path);
        
        this.tilesetURL.forEach(tileURL => {
            scene.load.image(tileURL.name, `${this.tilesetKey}${tileURL.image}`);
        })
        this.spriteSheet.forEach(spriteURL => {
            scene.load.spritesheet(spriteURL.name, `${this.tilesetKey}${spriteURL.image}`, { frameWidth: 24, frameHeight: 24 })
        })
    }
    update(time: number, delta: number): void {
        this.animatedTiles.forEach(tile => tile.update(delta));
    }
    createSpriteAnimations(scene: Phaser.Scene): void {
        scene.anims.create({
            key: "leftRun",
            frameRate: 10,
            frames: scene.anims.generateFrameNumbers("animatedUnits", { start: 0, end: 2 }),
            repeat: -1
        });
        scene.anims.create({
            key: "rightRun",
            frameRate: 10,
            frames: scene.anims.generateFrameNumbers("animatedUnits", { start: 3, end: 5 }),
            repeat: -1
        });

    }
    createLevelWithTileMap(scene: Phaser.Scene): void {
        this.createSpriteAnimations(scene);
        this.grid = scene.make.tilemap({ key: "map" });
        // console.log(map);
        const dessert_tilesets: Phaser.Tilemaps.Tileset  = this.grid.addTilesetImage("DESSERT2", "dessert-tiles");
        const sea_tilesets: Phaser.Tilemaps.Tileset  = this.grid.addTilesetImage("MAR2", "sea-tiles");
        const idleSprites_tilesets: Phaser.Tilemaps.Tileset  = this.grid.addTilesetImage("IdleRed", "idleRed-tiles");


        const animatedTile = this.grid.tilesets[3];
        // console.log(animatedTile);

        const ground = this.grid.createLayer(0, dessert_tilesets, 0, 0);
        const sea = this.grid.createLayer(4, sea_tilesets, 0, 0);
        const tree = this.grid.createLayer(1, dessert_tilesets, 0, 0);
        const mountain = this.grid.createLayer(2, dessert_tilesets, 0, 0);
        const mountain2 = this.grid.createLayer(3, dessert_tilesets, 0, 0);
        const idleSprites = this.grid.createLayer(5, idleSprites_tilesets, 0, 0);

        idleSprites.setScale(2)
        mountain.setScale(2)
        mountain2.setScale(2)
        ground.setScale(2)
        sea.setScale(2)
        tree.setScale(2)
        this.makeTileAnimations(idleSprites_tilesets, this.grid)
        this.makeTileAnimations(sea_tilesets, this.grid)
    }
    makeTileAnimations(tileSet: Phaser.Tilemaps.Tileset, map: Phaser.Tilemaps.Tilemap): void {
        const tileData = tileSet.tileData as TilesetTileData
        for (let tileid in tileData) {
            map.layers.forEach(layer => {
                if (layer.tilemapLayer === null || layer.tilemapLayer.type === "StaticTilemapLayer") return;
                layer.data.forEach(tileRow => {
                    tileRow.forEach(tile => {
                        if (tile.index - tileSet.firstgid === parseInt(tileid, 10)) {
                            this.animatedTiles.push(
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
    public getTileSet(id: number) {
        return this.tilesets[id];
    }
    public getTilesetURL(key: string) {
        return this.tilesetURL.find(tileset => tileset.image === key)
    }
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