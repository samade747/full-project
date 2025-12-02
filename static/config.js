// Inject runtime configuration for backend API URL
// This script runs before the app loads and sets window.BACKEND_API_URL
(function () {
    // In Vercel, environment variables are available at build time
    // We need to inject them at runtime for the client

    // For local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.BACKEND_API_URL = 'http://localhost:8000';
    } else {
        // For production (Vercel), this will be replaced by Vercel's environment variable
        // You can set this in Vercel dashboard: Settings > Environment Variables
        // The build will replace __BACKEND_API_URL__ with the actual value
        window.BACKEND_API_URL = '__BACKEND_API_URL__';
    }

    console.log('Backend API URL configured:', window.BACKEND_API_URL);
})();
