document.addEventListener('DOMContentLoaded', () => {
    const welcomeBanner = document.getElementById('welcome-banner');
    const ctaButtons = document.getElementById('cta-buttons');
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');

    // Retrieve active logged-in user from localStorage
    const activeUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (activeUser) {
        // Personalize the main header greeting
        if (welcomeBanner) {
            const h1 = welcomeBanner.querySelector('h1');
            if (h1) {
                h1.innerText = `Welcome Back, ${activeUser.username}!`;
            }
        }

        // Update action buttons to include Log Out
        if (ctaButtons) {
            ctaButtons.innerHTML = `
                <a href="game.html" class="button">Play Game Now</a>
                <button id="logout-btn" class="button" style="background-color: #80A4ED;">Log Out</button>
            `;

            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                window.location.reload();
            });
        }

        // Adjust navigation bar when user is logged in
        if (navLogin) {
            navLogin.innerText = 'Profile';
            navLogin.href = 'game.html';
        }
        if (navRegister) {
            navRegister.innerText = 'Log Out';
            navRegister.href = '#';
            navRegister.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                window.location.reload();
            });
        }
    }
});