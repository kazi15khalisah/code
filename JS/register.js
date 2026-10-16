document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = Array.from(form.querySelectorAll('input'));

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const confirm_password = document.getElementById('confirm_password');

    // Helper function: returns true only when every single input field contains text
    const checkAllFilled = () => {
        return inputs.every(input => input.value.trim() !== '');
    };

    // 1. Initial Page Load: Disable the submit button immediately
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    // 2. Real-time Input Listener: Enables/disables the button dynamically as the user types
    form.addEventListener('input', () => {
        if (submitBtn) {
            submitBtn.disabled = !checkAllFilled();
        }
    });

    // 3. Keydown Listener: Blocks the Enter key if any field is empty
    form.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !checkAllFilled()) {
            e.preventDefault(); // Stop form submission
            validateInputs();   // Show red error messages under missing fields
        }
    });

    // 4. Submit Listener: Runs when all fields are filled and user clicks Register or hits Enter
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (validateInputs()) {
                registerUser();
            }
        });
    }

    // --- Validation Helper Functions ---
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        if (errorDisplay) {
            errorDisplay.innerText = message;
        }
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = emailStr => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(emailStr).toLowerCase());
    };

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const ageValue = age.value.trim();
        const passwordValue = password.value.trim();
        const confirm_passwordValue = confirm_password.value.trim();
        let isValid = true;

        if (usernameValue === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (ageValue === '') {
            setError(age, 'Age is required');
            isValid = false;
        } else if (isNaN(ageValue) || Number(ageValue) < 5 || Number(ageValue) > 120) {
            setError(age, 'Provide a valid age');
            isValid = false;
        } else {
            setSuccess(age);
        }

        if (passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            setSuccess(password);
        }

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

       const registerUser = () => {
        const newUser = {
            username: username.value.trim(),
            email: email.value.trim(),
            age: age.value.trim(),
            password: password.value.trim(),
            highScore: 0,
            wordsDiscovered: 0
        };

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if username or email already exists in local storage
        const userExists = existingUsers.some(u => u.username === newUser.username || u['email'] === newUser['email']);

        if (userExists) {
            setError(username, 'Username or email already registered');
            return;
        }

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        // Redirect to game page upon successful registration
        window.location.href = 'game.html';
    };
});