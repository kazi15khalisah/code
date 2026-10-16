document.addEventListener('DOMContentLoaded', () => {
    const leaderboardBody = document.getElementById('leaderboard-body');
    if (!leaderboardBody) return;

    // 1. ALWAYS clear any existing HTML rows first
    leaderboardBody.innerHTML = '';

    // 2. Retrieve registered users and active session from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const storedActiveUser = localStorage.getItem('loggedInUser');
    const activeUser = storedActiveUser ? JSON.parse(storedActiveUser) : null;

    // 3. Handle empty state if no players have registered yet
    if (users.length === 0) {
        leaderboardBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 20px;">
                    No registered players yet. Register an account and play to claim #1!
                </td>
            </tr>
        `;
        return;
    }

    // 4. Sort users in descending order by high score (highest score first)
    users.sort((a, b) => (Number(b.highScore) || 0) - (Number(a.highScore) || 0));

    // 5. Build dynamic table rows for registered players
    users.forEach((user, index) => {
        const row = document.createElement('tr');

        // Highlight active user row
        if (activeUser && user.username === activeUser.username) {
            row.classList.add('current-player-row');
        }

        let rankBadge = `#${index + 1}`;
        if (index === 0) rankBadge = '🥇 1st';
        else if (index === 1) rankBadge = '🥈 2nd';
        else if (index === 2) rankBadge = '🥉 3rd';

        const words = user.wordsDiscovered || 0;
        const score = user.highScore || 0;

        row.innerHTML = `
            <td><strong>${rankBadge}</strong></td>
            <td>${user.username}</td>
            <td>${words} words</td>
            <td><strong>${Number(score).toLocaleString()} pts</strong></td>
        `;

        leaderboardBody.appendChild(row);
    });
});