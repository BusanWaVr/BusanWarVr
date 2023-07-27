import { Route, Routes } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Test from "./routes/Test";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Signup from "./routes/Signup.jsx";
import LiveStream from "./routes/LiveStream.jsx";
import LiveStreamView from "./routes/LiveStreamView.jsx";
import ChatRoom from "./routes/ChatRoom";
import TourRegistration from "./routes/TourRegistration.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/livestream" element={<LiveStream />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/tourregistration" element={<TourRegistration />} />
          <Route
            path="*"
            element={
              <h3>
                <b>NOT FOUND PAGE</b>
              </h3>
            }
          />
        </Route>
        <Route path="/livestream/:sessionid" element={<LiveStreamView />} />
      </Routes>
    </>
  );
}

export default App;
