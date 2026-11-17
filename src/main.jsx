import React from "react";
import ReactDOM from "react-dom/client";
// Шрифты отчёта: Inter (400–700) и Source Serif 4 (400, 600). WOFF2, font-display: swap.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/600.css";
import SportTrackApp from "./sporttrack/SportTrackApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SportTrackApp />
  </React.StrictMode>
);
