// It's good practice to centralize Supabase client initialization.
// For a larger app, you might create a separate file (e.g., supabaseClient.js)
// and import the client where needed.
const { createClient } = supabase;

// Supabase Credentials
const { supabaseUrl, supabaseKey } = window.SUPABASE_CONFIG;
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        showMessage(error.message, true);
    } else {
        window.location.href = 'index.html'; // Redirect to the main app
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const signupButton = signupForm.querySelector('button');
    signupButton.disabled = true;
    signupButton.textContent = 'Signing up...';

    const { error } = await _supabase.auth.signUp({ email, password });

    if (error) {
        showMessage(error.message, true);
    } else {
        showMessage('Success! Check your email for a confirmation link.', false);
        signupForm.reset();
        // Redirect to login page after successful signup
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); 
    }

    signupButton.disabled = false;
    signupButton.textContent = 'Sign Up';
});

// --- Initialization ---
// On page load, check if the user is already logged in and redirect them.
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        window.location.href = 'app.html';
    }
});