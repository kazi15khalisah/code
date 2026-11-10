import BootScene from '/JS/game/BootScene.js';


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



const level1Puzzles = [
    {
        id: "yarn_box",
        triggerx: 150,
        foreignWord: "صوف",
        correctAnswer: "wool",
        options: ["Wool", "Milk", "Fish", "Sleep"]
    },
    {
id: "yarn_wool",
triggerx: 180,
foreignWord: "صندوق",
correctAnswer: "box",
options: ["paper", "house", "box", "cardboard"]

    },

    {
    id: "street_fork_sign",
    triggerX: 450,
    signText: "السوق يمين", // "Market Right"
    foreignWord: "يمين",
    clueImage: "arrow_right", // or a CSS arrow shape!
    correctAnswer: "Right",
    options: ["Right", "Left", "Stop", "Closed"]
},
  {
        id: "sign_left",
        triggerX: 450,
        signText: "السوق يسار", // "Market Left"
        foreignWord: "يسار",
        clueImage: "arrow_left",
        correctAnswer: "Left",
        options: ["Right", "Left", "Straight on", "Stop"]
    },
    {
        id: "sign_straight",
        triggerX: 600,
        signText: "إلى الأمام", // "Straight ahead"
        foreignWord: "إلى الأمام",
        clueImage: "arrow_straight",
        correctAnswer: "Straight on",
        options: ["Right", "Left", "Straight on", "Stop"]
    },
    {
        id: "sign_stop",
        triggerX: 750,
        signText: "قف", // "Stop"
        foreignWord: "قف",
        clueImage: "sign_stop",
        correctAnswer: "Stop",
        options: ["Right", "Left", "Straight on", "Stop"]
    }

    
];



