import { saveUserScore, getLoggedInUser } from 'JS/storage.js';

export default class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.wordsDiscovered = 0;
        this.user = getLoggedInUser();
    }

    // Add points for correct translations
    addPoints(amount) {
        this.currentScore += amount;
    }

    // Deduct points for wrong guesses (minimum score is 0)
    deductPoints(amount) {
        this.currentScore = Math.max(0, this.currentScore - amount);
    }

    // Track words added to notebook
    recordWordDiscovered() {
        this.wordsDiscovered += 1;
    }

    getScore() {
        return this.currentScore;
    }

    getWordsCount() {
        return this.wordsDiscovered;
    }

    // Persist to localStorage via storage.js
    saveFinalScore() {
        if (this.user) {
            saveUserScore(this.currentScore, this.wordsDiscovered);
        }
    }
}