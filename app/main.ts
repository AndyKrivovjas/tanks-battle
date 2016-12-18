class TankGame {

    constructor() {
        this.game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('background', 'images/bg.jpg');
    }

    create() {
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    }

}

window.onload = () => {

    var game = new TankGame();

};
