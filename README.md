# Lumina - Interactive Digital Art Gallery

**✨ LUMINA ✨** - *Where Digital Art Comes to Life*

## 🌟 Overview

Lumina is an immersive digital art gallery that showcases interactive artwork from emerging and established digital artists. Built with Angular and Server-Side Rendering (SSR), Lumina delivers lightning-fast performance and optimal SEO, ensuring that art is discoverable and loads instantly for visitors.

The application demonstrates how to properly configure Angular SSR for Vercel deployment, providing a seamless development and production experience.

## ✨ Features

- **Immersive Art Exploration**: Browse through curated collections of digital artwork with smooth transitions and animations
- **Artist Spotlights**: Learn about featured artists and their creative processes
- **Server-Side Rendering**: Optimized for performance and SEO with Angular SSR
- **Responsive Design**: Beautiful experience across all devices and screen sizes
- **Lazy-Loaded Modules**: Efficient code-splitting for optimal performance

## 🚀 Live Demo

Visit the live application: [https://angular-ssr-vercel-ruby.vercel.app](https://angular-ssr-vercel-ruby.vercel.app)

## 🛠️ Technical Stack

- **Angular 19**: Latest version with standalone components
- **Angular SSR**: Server-side rendering for improved performance and SEO
- **Vercel Deployment**: Optimized for Vercel's edge network
- **Responsive Design**: Mobile-first approach with modern CSS

## 🔧 Development

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lumina-gallery.git

# Navigate to the project directory
cd lumina-gallery

# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building for Production

```bash
# Build the application for production
npm run build
```

### Testing SSR Locally

```bash
# Build and serve with SSR locally
npm run build
npm run serve:ssr:angular-ssr-vercel
```

## 📦 Deployment to Vercel

To deploy this application with SSR enabled on Vercel, follow these steps:

1. **Rename index.html file**:
   - Rename your `src/index.html` to something like `src/indexFile.html` (or any other name)

2. **Update angular.json**:
   - Change the `index` property in your `angular.json` to point to the renamed file:
   ```json
   "index": "src/indexFile.html",
   ```

3. **Add vercel.json**:
   - Create a `vercel.json` file in the root of your project with the following content:
   ```json
   {
     "version": 2,
     "public": true,
     "name": "angular-ssr-vercel",
     "rewrites": [
       { "source": "/(.*)", "destination": "/api" }
     ],
     "functions": {
       "api/index.js": {
         "includeFiles": "dist/angular-ssr-vercel/**"
       }
     }
   }
   ```

4. **Export app variable in src/server.ts**:
   - Make sure the Express app is exported in your `src/server.ts` file:
   ```typescript
   // Change from:
   const app = express();

   // To:
   export const app = express();
   ```
   - This export is required for the api/index.js file to properly import the app

5. **Create api/index.js**:
   - Create an `api` directory in the root of your project
   - Create an `index.js` file inside the `api` directory with the following content:
   ```javascript
   // This file serves as the entry point for Vercel's serverless function
   // It imports the Angular SSR server and handles requests

   // Import required modules
   const path = require('path');

   const serverDistPath = path.join(process.cwd(), 'dist/angular-ssr-vercel/server/server.mjs');

   export default import(serverDistPath).then(module => module.app);
   ```

6. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Select "Angular" as the framework preset
   - No additional configuration is needed in the Vercel dashboard
   - Deploy your application

The project is now configured for seamless deployment with SSR enabled on Vercel.

> **Note**: If you encounter any issues or have questions about the deployment process, please open an issue in the repository for assistance.

## 📚 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
