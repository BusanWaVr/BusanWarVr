import { Route, Routes } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Test from "./routes/Test";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";

function App() {
  return (
    <div className="container-md">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
    </div>
  );
}

export default App;
