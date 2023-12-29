
export class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA',
            active:true
        });

    }
    init() {
    }
    preload(): void {
    }
    create(): void {
        
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff3300, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(100, 100, 100, 100);
        this.add.text(120, 110, 'A', { font: '96px Courier', color: '#000000' });
    }
}
