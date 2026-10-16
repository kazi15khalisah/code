// Centralized storage module for user profiles and game scores

// Retrieve all registered users array from localStorage
export const getUsers = () => {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
};

// Retrieve the currently active logged-in user object
export const getLoggedInUser = () => {
    const data = localStorage.getItem('loggedInUser');
    return data ? JSON.parse(data) : null;
};

// Save high score and words discovered for the active user
export const saveUserScore = (newScore, wordsCount = 0) => {
    const activeUser = getLoggedInUser();
    if (!activeUser) return false;

    const users = getUsers();
    const userIndex = users.findIndex(u => u.username === activeUser.username);

    const currentHighScore = Number(activeUser.highScore) || 0;
    const currentWords = Number(activeUser.wordsDiscovered) || 0;

    // Keep the best high score and highest word count
    const updatedUser = {
        ...activeUser,
        highScore: Math.max(currentHighScore, newScore),
        wordsDiscovered: Math.max(currentWords, wordsCount)
    };

    // 1. Update active session in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    // 2. Update master users list in localStorage
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
    } else {
        users.push(updatedUser);
    }
    localStorage.setItem('users', JSON.stringify(users));

    return true;
};