export class SceneC extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'SceneC', active: true });
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(320, 110, 'C', { font: '96px Courier', color: '#000000' });
    }
}
