import React from "react";
import ReactDOM from "react-dom/client";

import App from "./navigations/App.tsx";
import registerServiceWorker from "./utils/registerServiceWorker.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./store/DataContext.tsx";

import { Provider } from 'react-redux';
import store from './store'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
registerServiceWorker();
