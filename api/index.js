// This file serves as the entry point for Vercel's serverless function
// It imports the Angular SSR server and handles requests

// Import required modules
const path = require('path');
const fs = require('fs');

// Define the path to the Angular SSR server
const serverDistPath = path.join(process.cwd(), 'dist/angular-ssr-vercel/server/server.mjs');

// Export a handler function for Vercel
module.exports = async (req, res) => {
  try {
    fs.readdir('./', (err, files) => {
      const fileList = [];
      files.forEach(file => {
        fileList.push(file);
      });
      console.log('Current directory files:', fileList);
    });

    // Check if the server file exists
    if (!fs.existsSync(serverDistPath)) {
      console.error(`Server file not found at: ${serverDistPath}`);
      return res.status(500).send(`[1] Server file not found`);
    }

    // Dynamically import the server module (it's an ESM module)
    const serverModule = await import(serverDistPath);

    // Get the app from the server module
    const app = serverModule.app;

    // If app is not available, return an error
    if (!app) {
      console.error('Server app not found in the imported module');
      console.log('Server module:', serverDistPath);
      console.log('Server dir:', serverDistPath);
      return res.status(500).send(`[2] Server app not found ${serverDistPath}`);
    }

    // Use the app to handle the request
    return app(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// export default import('server.mjs').then(module => module.app());
