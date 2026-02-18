# Indonesian Food Classification Web Application (Frontend)

This repository contains the frontend implementation of an Indonesian food classification web application. The application allows users to upload images of Indonesian food, sends them to a backend API for classification, and displays AI-generated recipes based on the prediction results.

The frontend is built using Vanilla JavaScript with a modular structure and is designed to be lightweight, responsive, and easy to integrate with different backend environments.

---

## Features

- Integration with a RESTful backend API
- Display of classification results and confidence score
- AI-generated recipe rendering
- Fully responsive user interface
- Progressive Web App (PWA) support

---

## Tech Stack

Frontend:
- Vanilla JavaScript (ES6+)
- Bootstrap 5

Backend (separate repository):
- Flask (Python)
- CNN-based food classification model (MobileNetV2)
- Large Language Model for recipe generation
- You can access the Backend repository [here](https://github.com/warizmy/indo-food-classification-BE).

---

## Application Flow

1. User uploads an image of Indonesian food.
2. The image is sent to the backend API.
3. The backend performs food classification using a CNN model.
4. The predicted food name is passed to an LLM to generate a recipe.
5. The frontend renders:
   - Food name
   - Generated recipe content

---

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/food-classification-frontend.git
cd food-classification-frontend
```

### Configure API Endpoint

Update the backend base URL inside the API utility file:

```javascript
// src/utils/api.js
const BASE_URL = 'http://localhost:5000';
```

Change the URL according to your backend deployment environment.

---

## Running the Application

This project is a static frontend application.

You can run it using:
- Live Server (VS Code extension)
- Any static file server
- Static hosting platforms such as GitHub Pages, Netlify, or Vercel

---

## Progressive Web App (PWA)

This application includes PWA support, enabling:
- Offline access for cached assets
- Installable web application experience
- Responsive behavior across devices

Ensure that `manifest.json` and `service-worker.js` are properly registered.

---

## Design Considerations

- Built with Vanilla JavaScript to emphasize core JavaScript fundamentals
- Modular file structure for maintainability
- Separation of concerns between UI logic, API handling, and utilities
- Easily extendable to modern frameworks such as React or Next.js

---

## Future Improvements

- Migration to React or Next.js
- User authentication and profile management
- Backend-based history persistence
- Image storage using cloud services
- Multi-language support
