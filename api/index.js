// This file serves as the entry point for Vercel's serverless function
// It imports the Angular SSR server and handles requests

// Import required modules
const path = require('path');
const fs = require('fs');

// Define the path to the Angular SSR server
const serverDistPath = '../angular-ssr-vercel/server/server.mjs';
const serverDistPath2 = path.join(process.cwd(), 'angular-ssr-vercel/server/server.mjs');

// Export a handler function for Vercel
module.exports = async (req, res) => {
  try {
    // Check if the server file exists
    if (!fs.existsSync(serverDistPath) && !fs.existsSync(serverDistPath2)) {
      console.error(`Server file not found at: ${serverDistPath}`);
      return res.status(500).send(`[1] Server file not found ${serverDistPath} ${serverDistPath2}`);
    }

    // Dynamically import the server module (it's an ESM module)
    const serverModule = await import(serverDistPath);
    const serverModule2 = await import(serverDistPath);

    // Get the app from the server module
    const app = serverModule.app || serverModule2.app;

    // If app is not available, return an error
    if (!app) {
      console.error('Server app not found in the imported module');
      console.log('Server module:', serverDistPath);
      console.log('Server dir:', serverDistPath);
      console.log('Server dir:', serverDistPath2);
      return res.status(500).send(`[2] Server app not found ${serverDistPath} ${serverDistPath2}`);
    }

    // Use the app to handle the request
    return app(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).send('Internal Server Error');
  }
};
