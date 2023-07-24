import { Route, Routes } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Test from "./routes/Test";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Signup from "./routes/Signup.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          path="*"
          element={
            <h3>
              <b>NOT FOUND PAGE</b>
            </h3>
          }
        />
      </Routes>
    </>
  );
}

export default App;
