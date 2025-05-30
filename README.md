# [speech-to-text-frontend-karim] - Speech-to-Text Frontend

---

## Project Description

This is the user interface (frontend) for the Speech-to-Text application. It allows users to upload audio files, sends them to a backend API for transcription and sentiment analysis, and then displays the results in a clear and organized manner.

## Features

- **Audio File Upload:** Intuitive interface for selecting and uploading audio files (WAV, MP3, etc.).
- **Real-time Transcription Display:** Shows the transcription and its status after processing.
- **Sentiment Display:** Presents the sentiment (Positive, Negative, Neutral, N/A) of the transcribed text.
- **History View:** Lists all previous transcriptions with their details.

## Technologies Used

- **Frontend Framework:** React.js
- **HTTP Client:** Axios
- **Build Tool:** Create React App

## Local Setup & Installation

Follow these steps to get the frontend running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn
- Git

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/karimnaderr/speech-to-text-frontend]
    cd speech-to-text-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the `speech-to-text-frontend` directory. This tells your React app where your backend API is located.

    ```dotenv
    REACT_APP_API_BASE_URL="http://localhost:8000"
    # IMPORTANT: When deploying, this value MUST be changed to your deployed backend API URL (e.g., [https://your-backend-api.onrender.com](https://your-backend-api.onrender.com))
    ```

4.  **Run the application:**
    ```bash
    npm start
    # or yarn start
    ```
    The frontend will open in your browser, usually at `http://localhost:3000`.

## Deployment

This frontend is designed to be deployed as a static site on platforms like **Render.com** (as a Static Site), Vercel, or Netlify. Refer to the deployment guide for specific instructions.

---
