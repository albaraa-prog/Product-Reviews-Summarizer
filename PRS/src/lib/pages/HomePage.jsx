import React, { useState } from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");
  
    const summaryLength = "medium"; // "short", "medium", or "long"
    const outputLanguage = "en"; // Change this to any desired language ISO code (e.g., "ar" for Arabic)
  
    try {
      const response = await fetch("https://api.apyhub.com/ai/summarize-url", {
        method: "POST",
        headers: {
          "apy-token": import.meta.env.VITE_APYHUB_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          summary_length: summaryLength,
          output_language: outputLanguage,
        }),
      });
  
      const data = await response.json();
      console.log(data); // Log the full response
  
      if (response.ok) {
        if (data.summary) {
          setSummary(data.summary);
        } else {
          setError("Summary not available.");
        }
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="homepage">
      <h1>Product Reviews Summarizer</h1>
      <p>Paste a product review URL below to generate a concise summary.</p>
      <input
        type="text"
        placeholder="Enter URL here..."
        className="url-input"
        value={url}
        onChange={handleUrlChange}
      />
      <button className="summarize-btn" onClick={handleSummarize}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summary-container">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default HomePage;
