document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    if (!form) return;

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const confirm_password = document.getElementById('confirm_password');

    // 1. Submit Listener: Runs when user clicks Register or hits Enter
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // 🛑 Stop page refresh

        // Validate inputs and display error text under missing fields
        if (validateInputs()) {
            registerUser();
        }
    });

    // --- Error Helper Functions ---
    const setError = (element, message) => {
        const inputControl = element.parentElement; // <div class="input-control">
        const errorDisplay = inputControl.querySelector('.error');

        if (errorDisplay) {
            errorDisplay.innerText = message;
        }
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement; // <div class="input-control">
        const errorDisplay = inputControl.querySelector('.error');

        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = (emailStr) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(emailStr).toLowerCase());
    };

    // --- Validation Logic ---
    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const ageValue = age.value.trim();
        const passwordValue = password.value.trim();
        const confirm_passwordValue = confirm_password.value.trim();
        let isValid = true;

        // Username Check
        if (usernameValue === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else {
            setSuccess(username);
        }

        // Email Check
        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Age Check
        if (ageValue === '') {
            setError(age, 'Age is required');
            isValid = false;
        } else if (isNaN(ageValue) || Number(ageValue) < 5 || Number(ageValue) > 120) {
            setError(age, 'Provide a valid age');
            isValid = false;
        } else {
            setSuccess(age);
        }

        // Password Check
        if (passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            setSuccess(password);
        }

        // Confirm Password Check
        if (confirm_passwordValue === '') {
            setError(confirm_password, 'Please confirm your password');
            isValid = false;
        } else if (confirm_passwordValue !== passwordValue) {
            setError(confirm_password, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(confirm_password);
        }

        return isValid;
    };

    // --- Save User to localStorage & Redirect ---
    const registerUser = () => {
        const newUser = {
            username: username.value.trim(),
            email: email.value.trim(),
            age: Number(age.value.trim()),
            password: password.value.trim(),
            highScore: 0,
            wordsDiscovered: 0
        };

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username or email is already taken
        const userExists = existingUsers.some(
            (u) => u.username.toLowerCase() === newUser.username.toLowerCase() ||
                   u.email.toLowerCase() === newUser.email.toLowerCase()
        );

        if (userExists) {
            setError(username, 'Username or email already registered');
            return;
        }

        // Save new user in JSON format
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('gato_current_user', newUser.username);

        // Redirect to game page
        window.location.href = 'game.html';
    };
});