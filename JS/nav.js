document.addEventListener('DOMContentLoaded', () => {
    // 1. Select navigation elements
    const loginLi = document.getElementById('nav-login-li');
    const registerLi = document.getElementById('nav-register-li');
    const logoutLi = document.getElementById('nav-logout-li');
    const logoutBtn = document.getElementById('nav-logout-btn');

    // 2. Check active user session from localStorage
    const activeUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // 3. Toggle visibility using the HTML hidden attribute
    if (activeUser) {
        // User IS logged in: hide Log In & Register, show Log Out
        if (loginLi) loginLi.hidden = true;
        if (registerLi) registerLi.hidden = true;
        if (logoutLi) logoutLi.hidden = false;
    } else {
        // User IS NOT logged in: show Log In & Register, hide Log Out
        if (loginLi) loginLi.hidden = false;
        if (registerLi) registerLi.hidden = false;
        if (logoutLi) logoutLi.hidden = true;
    }

    // 4. Handle Log Out button click event
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Clear active session
            localStorage.removeItem('loggedInUser');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
});