import React from "react"; import { createRoot } from "react-dom/client"; import Demo from "./Demo.live";
createRoot(document.getElementById("root")!).render(<React.StrictMode><main><h1>Vite</h1><Demo /></main></React.StrictMode>);
