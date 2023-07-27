import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import registerServiceWorker from "../src/modules/registerServiceWorker.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
registerServiceWorker();
