import { Route, Routes } from "react-router-dom";
import RootLayout from "../components/pages/Root/RootLayout.tsx";

import PrivateRoute from "./PrivateRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";
import GuideRoute from "./GuideRoute.tsx";
import UserRoute from "./UserRouter.tsx";

import Test from "../components/blocks/Test.tsx";
import Dashboard from "../components/pages/Auth/Dashboard.tsx";
import Home from "../components/pages/Home/Home.tsx";
import Signup from "../components/pages/Auth/Signup.jsx";
import Update from "../components/pages/Auth/Update.tsx";
import GuideSignup from "../components/pages/Auth/GuideSignup.jsx";
import LiveStream from "../components/pages/LiveStream/LiveStream.jsx";
import LiveStreamView from "../components/pages/LiveStream/LiveStreamView.jsx";
import ChatRoom from "../components/pages/LiveStream/ChatRoom.tsx";
import TourRegistration from "../components/pages/Tour/TourRegistration.tsx";
import TourDetail from "../components/pages/Tour/TourDetail/TourDetail.tsx";
import GuideDetail from "../components/pages/GuideProfile/GuideDetail.tsx";
import GuideMyPage from "../components/pages/GuideProfile/GuideMyPage.tsx";
import TourUpdate from "../components/pages/Tour/TourUpdate.tsx";
import WritePage from "../components/pages/Mate/WritePage";
import MateDetail from "../components/pages/Mate/MateDetail";
import MateList from "../components/pages/Mate/MateList";
import MateEdit from "../components/pages/Mate/MateEdit";
import ReviewWrite from "../components/pages/Review/ReviewWrite";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/guidesignup" element={<GuideSignup />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/livestream" element={<LiveStream />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/chatroom" element={<ChatRoom />} />
          </Route>

          <Route element={<GuideRoute />}>
            <Route path="/tour/write" element={<TourRegistration />} />
          </Route>

          <Route path="/update" element={<Update />} />
          <Route path="/tour/:tourId/update" element={<TourUpdate />} />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          <Route path="/guide/:guideId/detail" element={<GuideDetail />} />

          <Route element={<GuideRoute />}>
            <Route path="/guide/:guideId/mypage" element={<GuideMyPage />} />
          </Route>

          <Route element={<UserRoute />}>
            <Route path="/write" element={<WritePage />} />
            <Route path="/review/write" element={<ReviewWrite />} />
          </Route>

          <Route path="/matedetail/:mateId" element={<MateDetail />} />
          <Route path="/mate" element={<MateList />} />

          <Route element={<UserRoute />}>
            <Route path="/mateedit/:mateId" element={<MateEdit />} />
          </Route>

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
