import { Route, Routes } from "react-router-dom";
import RootLayout from "../components/pages/Root/RootLayout.tsx";
import Test from "../components/blocks/Test.tsx";
import Dashboard from "../components/pages/Auth/Dashboard.tsx";
import Home from "../components/pages/Home/Home.tsx";
import Signup from "../components/pages/Auth/Signup.jsx";
import GuideSignup from "../components/pages/Auth/GuideSignup.jsx";
import LiveStream from "../components/pages/LiveStream/LiveStream.jsx";
import LiveStreamView from "../components/pages/LiveStream/LiveStreamView.jsx";
import ChatRoom from "../components/pages/LiveStream/ChatRoom.tsx";
import TourRegistration from "../components/pages/Tour/TourRegistration.tsx";
import GuideDetail from "../components/pages/GuideProfile/GuideDetail.tsx";
import GuideMyPage from "../components/pages/GuideProfile/GuideMyPage.tsx";
import WritePage from "../components/pages/Mate/WritePage";
import MateDetail from "../components/pages/Mate/MateDetail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guidesignup" element={<GuideSignup />} />
          <Route path="/livestream" element={<LiveStream />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/tourregistration" element={<TourRegistration />} />
          <Route path="/guide/:guideId/detail" element={<GuideDetail />} />
          <Route path="/guide/:guideId/mypage" element={<GuideMyPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/matedetail" element={<MateDetail />} />
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
