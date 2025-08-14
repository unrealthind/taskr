// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const authView = document.getElementById('auth-view');
const signupView = document.getElementById('signup-view');
const messageContainer = document.getElementById('message-container');

/**
 * Displays a message to the user.
 * @param {string} message - The message to display.
 * @param {boolean} isError - Whether the message is an error.
 */
const showMessage = (message, isError = false) => {
    messageContainer.textContent = message;
    messageContainer.className = `text-center mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`;
};

// --- Event Listeners ---

// Toggle between login and signup forms
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authView.classList.add('hidden');
    signupView.classList.remove('hidden');
    messageContainer.textContent = ''; // Clear any previous messages
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupView.classList.add('hidden');
    authView.classList.remove('hidden');
    messageContainer.textContent = ''; // Clear any previous messages
});

// Handle login form submission
// It now uses the global _supabase client from supabase-client.js
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        showMessage(error.message, true);
    } else {
        // Redirect to index.html to handle session routing
        window.location.href = 'index.html'; 
    }
});

// Handle signup form submission
// It now uses the global _supabase client from supabase-client.js
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const signupButton = signupForm.querySelector('button');
    signupButton.disabled = true;
    signupButton.textContent = 'Signing up...';

    const { data, error } = await _supabase.auth.signUp({ email, password });

    if (error) {
        showMessage(error.message, true);
    } else {
        showMessage('Success! Check your email for a confirmation link.', false);
        signupForm.reset();
    }

    signupButton.disabled = false;
    signupButton.textContent = 'Sign Up';
});