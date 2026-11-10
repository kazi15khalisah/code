import { getLoggedInUser } from '/JS/storage.js';
import BootScene from '/JS/game/BootScene.js';

// 1. User authentication check
if (!getLoggedInUser()) {
    window.location.href = 'login.html';
}

// 2. Phaser Game Configuration
const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'game-container',
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // Pass the imported BootScene class inside the array!
    scene: [BootScene]
};

// 3. Initialize Game
const game = new Phaser.Game(config);