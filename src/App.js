import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const API_BASE_URL = "http://127.0.0.1:8000";

  const fetchTranscripts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transcripts/`);
      setTranscripts(response.data);
    } catch (err) {
      console.error("Error fetching transcripts:", err);
      setError("Failed to load past transcripts.");
    }
  };

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an audio file first!");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentTranscript(null);

    const formData = new FormData();
    formData.append("audio_file", selectedFile);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/transcribe/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCurrentTranscript(response.data);

      fetchTranscripts();
    } catch (err) {
      console.error("Error uploading file:", err);
      if (err.response) {
        setError(
          `Error: ${err.response.data.detail || err.response.statusText}`
        );
      } else {
        setError("Error: Could not connect to the backend server.");
      }
    } finally {
      setLoading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Speech-to-Text Transcriber
      </h1>

      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#555" }}>Upload Audio</h2>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "block", marginBottom: "15px" }}
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Transcribing..." : "Transcribe Audio"}
        </button>

        {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

        {currentTranscript && (
          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#e9f7ef",
            }}
          >
            <h3 style={{ color: "#28a745" }}>Latest Transcription:</h3>
            <p>
              <strong>ID:</strong> {currentTranscript.transcript_id}
            </p>
            <p>
              <strong>Status:</strong> {currentTranscript.status}
            </p>
            <p>
              <strong>Sentiment:</strong> {currentTranscript.sentiment}
            </p>{" "}
            {/* Display Sentiment */}
            <p>
              <strong>Text:</strong> {currentTranscript.text}
            </p>
          </div>
        )}
      </div>

      <hr style={{ margin: "40px 0", borderColor: "#eee" }} />

      <div
        style={{
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#555" }}>All Transcripts</h2>
        {transcripts.length === 0 && !loading && (
          <p>No transcripts yet. Upload an audio file!</p>
        )}
        {transcripts.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {transcripts.map((t) => (
              <li
                key={t.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p>
                  <strong>ID:</strong> {t.id}
                </p>
                <p>
                  <strong>File:</strong> {t.filename}
                </p>
                <p>
                  <strong>Status:</strong> {t.status}
                </p>
                <p>
                  <strong>Sentiment:</strong> {t.sentiment}
                </p>{" "}
                {/* Display Sentiment */}
                <p>
                  <strong>Text:</strong> {t.transcript_text}
                </p>
                <p style={{ fontSize: "0.8em", color: "#777" }}>
                  <em>
                    Transcribed on: {new Date(t.created_at).toLocaleString()}
                  </em>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
