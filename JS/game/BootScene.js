export default class BootScene extends Phaser.Scene {
    constructor() {

        super('BootScene');
    }

    preload() {
        // Preload Gato's spritesheet
        this.load.spritesheet('gato', '/images/gato_sheet.png', {
            frameWidth: 192,
            frameHeight: 336
        });
    }

    create() {
        // Set the background color on the game container div
        const div = document.getElementById('game-container');
        if (div) {
            div.style.backgroundColor = '#80A4ED';
        }

        // Gato's walking animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('gato', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        // Spawn Gato and store on 'this' so update() can access it
        this.gato = this.add.sprite(50, 300, 'gato');
        this.gato.setScale(0.5);
        this.gato.play('walk');
    }

    update() {
        // Move Gato across screen
        this.gato.x += 2;

        // Reset position when off-screen
        if (this.gato.x > this.sys.game.config.width + 100) {
            this.gato.x = -100;
        }
    }
}