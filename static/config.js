// Inject runtime configuration for backend API URL
// This script runs before the app loads and sets window.BACKEND_API_URL
(function () {
    // For local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.BACKEND_API_URL = 'http://localhost:8000';
    } else {
        // For production (Vercel) - use Railway backend
        window.BACKEND_API_URL = 'https://full-project-production.up.railway.app';
    }

    console.log('Backend API URL configured:', window.BACKEND_API_URL);
})();
