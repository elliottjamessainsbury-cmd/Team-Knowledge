import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      const err = this.state.error;
      return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
          <h1 style={{ fontSize: 18, marginTop: 0 }}>Runtime error (check Console too)</h1>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, overflow: "auto" }}>
            {err?.message || String(err)}
            {"\n\n"}
            {err?.stack || ""}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Missing <div id="root"></div> in index.html');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
