# Insightly.ai

Insightly.ai is a specialized customer feedback analysis platform designed to transform raw qualitative data into actionable business strategies. By leveraging a dual-engine AI approach—IndoBERT for precise sentiment detection and Google Gemini for strategic reasoning—the application provides deep contextual understanding of customer voices.

## Core Features

- **Hybrid AI Engine**: Utilizes IndoBERT for high-accuracy Indonesian sentiment analysis and Gemini AI for topic extraction and recommendation generation.
- **Batch Analysis**: Supports bulk processing of datasets via CSV and Excel file uploads.
- **Strategic Reporting**: Generates comprehensive PDF reports featuring sentiment distribution and prioritized action plans.
- **API Integration**: Offers a dedicated API documentation page for seamless integration with third-party applications.
- **Live Sandbox**: Allows real-time testing of the sentiment engine directly from the landing page.

## Technical Architecture

The application is built as a Single Page Application (SPA) using a modular JavaScript architecture to ensure maintainability and performance.

- **Frontend**: Vanilla JavaScript (ES6+), Bootstrap 5, Custom CSS Modules.
- **State Management**: Router-based page transitions and state persistence during analysis sessions.
- **Reporting**: jsPDF for dynamic document generation.
- **Visualization**: Chart.js for data distribution mapping.

## Directory Structure

- `/src/view/pages`: Contains main page modules (Home, Analyze, APIDocs).
- `/src/view/pages/sections`: Modular components for landing page sections (Hero, Guide, Features).
- `/src/styles`: Categorized CSS modules (main.css, home.css, analyze.css, docs.css).
- `/src/utils`: Utility classes for API communication and UI notifications.

## Getting Started

### Prerequisites

- Modern Web Browser (Chrome, Firefox, Safari, Edge).
- Node.js environment for dependency management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/insightly-ai.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your API base URL:
   ```text
   BASE_URL=your_api_here
   ```
4. Run the development server:
   ```bash
   npm run start-dev
   ```

## API Documentation

The API reference is available at `/apidocs` within the application. Key endpoints include:

- `POST /predict`: Real-time single-text sentiment analysis.
- `POST /analyze-upload`: Multipart/form-data endpoint for batch file processing.

## Deployment

This project is configured for deployment on Netlify. Ensure the `dist` file is present in the publish directory.
