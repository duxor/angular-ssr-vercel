# Lumina - Interactive Digital Art Gallery

![Lumina Logo](https://via.placeholder.com/150x50?text=Lumina)

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

Visit the live application: [https://lumina-gallery.vercel.app](https://lumina-gallery.vercel.app)

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

This project is configured for seamless deployment to Vercel. Simply connect your GitHub repository to Vercel, and it will automatically detect the Angular configuration and deploy with SSR enabled.

## 📚 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
