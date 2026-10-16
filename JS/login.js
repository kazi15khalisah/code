document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            clearErrors();

            const usernameVal = usernameInput.value.trim();
            const passwordVal = passwordInput.value.trim();

            let isValid = true;

            if (usernameVal === '') {
                setError(usernameInput, 'Please enter your username or email');
                isValid = false;
            }

            if (passwordVal === '') {
                setError(passwordInput, 'Please enter your password');
                isValid = false;
            }

            if (isValid) {
                authenticateUser(usernameVal, passwordVal);
            }
        });
    }

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        if (errorDisplay) {
            errorDisplay.innerText = message;
        }
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const clearErrors = () => {
        const inputControls = form.querySelectorAll('.input-control');
        inputControls.forEach(control => {
            control.classList.remove('error');
            const errorDisplay = control.querySelector('.error');
            if (errorDisplay) {
                errorDisplay.innerText = '';
            }
        });
    };

    const authenticateUser = (identifier, password) => {
        // Retrieve stored registered users from localStorage
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Check if username or email matches and password is correct
        const foundUser = users.find(u => 
            (u.username === identifier || u['email'] === identifier) && u.password === password
        );

        if (foundUser) {
            // Save currently logged-in user session
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            
            // Redirect to game page
            window.location.href = 'game.html';
        } else {
            setError(usernameInput, 'Invalid username/email or password');
        }
    };
});