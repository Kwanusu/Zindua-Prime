# ZinduaPrime

A modern React application built for a digital-first business experience, combining a polished landing page, user authentication flow, admin access handling, and a storefront demo. The project demonstrates responsive UI design, routing, state management, theming, and context-based architecture in a real-world application structure.

## Overview

ZinduaPrime is a front-end learning and product showcase app that includes:
- A responsive marketing homepage
- A dark/light theme toggle
- Navbar with authenticated and admin-specific actions
- User profile page and protected routes
- Admin dashboard access for authorized users
- Product/cart demo with filtering and local persistence
- Contact, About, Blog, and legal content pages
- Context-based state handling with React hooks

This project is intended to showcase practical React patterns and application architecture using Vite and React Router.

## Tech Stack

- React
- Vite
- JavaScript
- React Router DOM
- Context API
- Tailwind CSS
- Lucide React Icons
- Local JSON product data
- Browser localStorage for cart persistence

## Project Goals

The app is designed to demonstrate:
- Component-based UI design
- Scalable routing setup
- State management with contexts and reducers
- Auth-aware navigation and route protection
- UI responsiveness across mobile and desktop screens
- Data fetching and async state handling patterns
- Modern, polished product experience for a digital brand

## Features

### User Experience
- Sticky responsive navigation bar
- Light and dark mode switching
- Mobile navigation menu
- Branding and launch-style landing page
- Reusable UI design patterns

### Authentication & Authorization
- User context with login/logout actions
- Authorization checks for admin-only navigation
- Profile access for authenticated users
- Conditional rendering based on user role

### Storefront Demo
- Product catalog from JSON data
- Search/filter functionality
- Cart state management
- Cart persistence with localStorage
- Remove item actions from cart

### Extra Pages
- About page
- Contact page
- Profile page
- Admin panel
- Blog-style content pages
- Footer and supporting layout sections

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v18 or later recommended)
- npm or yarn

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/Kwanusu/Zindua-Prime.git
cd Zindua-Prime
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open the app in your browser

The default Vite local URL is typically:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
Starts the development server.

```bash
npm run build
```
Creates a production build.

```bash
npm run preview
```
Previews the production build locally.

## Project Structure

```bash
zindua-prime/
├── public/
│   ├── products.json
│   └── ...
├── src/
│   ├── components/
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AdminPage.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── ...
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── ...
```

## State Management

The app uses React Context for shared application state:
- UserContext for authentication and user session
- ThemeContext for dark/light mode
- CartContext for basket state and local storage sync

This keeps the project modular and easier to extend as new features are added.

## Styling

The application uses:
- Tailwind CSS for utility-first styling
- Responsive utility classes
- Custom theme-aware styles
- Clean visual hierarchy for CTA sections and navigation blocks

## How the App Works

### Home Page
The landing page introduces the brand and highlights product capabilities with call-to-action sections and key marketing content.

### Profile & Auth
Authenticated users can access their personal profile from the navbar. Role-based checks allow admin access to dedicated dashboard content.

### Storefront
The storefront fetches product data from a local JSON file and lets users:
- Browse products
- Search by name
- Add to cart
- Remove items from cart
- Preserve cart state across refreshes

## Notes for Development

This project is suitable for:
- React practice and state management learning
- UI implementation exercises
- Portfolio demonstration of route-based React apps
- Exploring authentication and authorization patterns in front-end apps

## Future Enhancements

Possible next improvements include:
- Product detail pages
- Checkout flow
- Payment integration
- Real backend API integration
- Role-based route protection with redirect logic
- Better form validation and error handling
- Improved test coverage

## License

This project is for educational and portfolio use. Please check the repository for licensing details if you plan to use it commercially.

## Author

ZinduaPrime is developed as a learning-focused React application in the Zindua / React training context.

## Contributing

Pull requests are welcome. If you want to contribute:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

## Contact

For project-related questions or feedback, use the contact page in the app or reach out through the repository owner’s contact details.

---

Built with React, Vite, and a modern component-led architecture.