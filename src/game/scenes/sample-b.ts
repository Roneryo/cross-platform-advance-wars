export class SceneB extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'SceneB', active: true });
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff9933, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(200, 100, 100, 100);

        this.add.text(220, 110, 'B', { font: '96px Courier', color: '#000000' });
    }
}