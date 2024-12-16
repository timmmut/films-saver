# Movie Favorites Project

## Overview

The **Movie Favorites Project** is a web application that allows users to register and log in to their accounts. Users can view, add, and manage their favorite movies, as well as explore a curated list of the top 50 recommended movies. The application is built using **Node.js**, the **Express** framework, and the **Handlebars** templating engine.

## Features

- **User Registration and Login**: Users can create an account and log in securely.
- **Movie Browsing**: Discover a curated list of movies and add them to your favorites.
- **Favorite Movies Management**: Add or remove movies from your personal favorites list.
- **Recommended Movies**: Browse a predefined selection of the top 50 recommended movies.

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Framework for creating web applications and APIs.
- **Handlebars (hbs)**: Templating engine for dynamic rendering of views.
- **HTML, CSS, JavaScript**: Frontend for user interface and interaction.

## Installation

Follow these steps to set up and run the application on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   node app.js
   ```

   The application will start at `http://localhost:1717`.

## Project Structure

```
├── Middleware/
│   └── all.middleware.js          # Custom middleware for HTTP logging
├── src/                           # Static files (e.g., CSS)
├── utils/
│   ├── accounts.js                # User account management
│   ├── film.js                    # Movie data management
│   └── recFilms.js                # Recommended movies data
├── views/
│   ├── partials/                  # Handlebars partial templates
│   ├── accCab.hbs                 # Account dashboard view
│   ├── enter.hbs                  # Login page view
│   ├── films.hbs                  # Movies page view
│   ├── recFilms.hbs               # Recommended movies page view
│   └── registration.hbs           # Registration page view
├── app.js                         # Main application logic
└── package.json                   # Project dependencies
```

## Middleware

A custom middleware is used for logging HTTP requests:

```javascript
logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
```

## Usage

1. **Register a New Account**:
   Navigate to the registration page and fill in the required details.

2. **Log in to Your Account**:
   Enter your credentials to access your dashboard.

3. **Add Movies to Favorites**:
   Browse movies and click "Add to Favorites" to save them.

4. **Manage Favorite Movies**:
   Access your account dashboard to view or remove your favorite movies.

5. **Explore Recommended Movies**:
   Browse the top 50 recommended movies from the dedicated section.
