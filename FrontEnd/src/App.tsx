import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import useAuth from "./hooks/useAuth";

const App: React.FC = () => {
  const isAuthenticated = useAuth();

  return (
    <div>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="/login" element={<LoginForm />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
