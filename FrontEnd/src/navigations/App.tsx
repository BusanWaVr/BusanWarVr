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
// import GuideMyPageMain from "../components/pages/GuideProfile/GuideMyPageMain.tsx";
import GuideMyPage from "../components/pages/GuideProfile/GuideMyPage.jsx";
import GuideMain from "../components/pages/GuideProfile/GuideMain.jsx";
import GuideFollower from "../components/pages/GuideProfile/GuideFollower.jsx";
import GuideTourBoard from "../components/pages/GuideProfile/GuideTourBoard.jsx";
import GuideScheduledBoard from "../components/pages/GuideProfile/GuideScheduledBoard.jsx";
import GuideEndedBoard from "../components/pages/GuideProfile/GuideEndedBoard.jsx";
import GuideCanceledBoard from "../components/pages/GuideProfile/GuideCanceledBoard.jsx";
import TestPage from "../components/pages/GuideProfile/TestPage.jsx";

import TourBoard from "../components/pages/Tour/TourBoard";
import TourUpdate from "../components/pages/Tour/TourUpdate.tsx";
import MateWrite from "../components/pages/Mate/MateWrite.jsx";
import MateDetail from "../components/pages/Mate/MateDetail";
import MateList from "../components/pages/Mate/MateList";
import MateEdit from "../components/pages/Mate/MateEdit";
import ReviewWrite from "../components/pages/Review/ReviewWrite";
import ReviewEdit from "../components/pages/Review/ReviewEdit";
import UserMyPage from "../components/pages/UserProfile/UserMyPage";
import UserMain from "../components/pages/UserProfile/UserMain";
// import UserNavbar from "../components/pages/UserProfile/UserNavbar";
import UserTourBoard from "../components/pages/UserProfile/UserTourBoard";
import UserWishBoard from "../components/pages/UserProfile/UserWishBoard";
import UserFollowingBoard from "../components/pages/UserProfile/UserFollowingBoard";
import UserScheduledBoard from "../components/pages/UserProfile/UserScheduledBoard";
import UserEndedBoard from "../components/pages/UserProfile/UserEndedBoard";
import UserCanceledBoard from "../components/pages/UserProfile/UserCanceledBoard";
import UserReviewBoard from "../components/pages/UserProfile/UserReviewBoard";
import TestTest from "../components/pages/Test/TestTest.jsx";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />

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
            <Route path="/update" element={<Update />} />
            <Route path="/livestream" element={<LiveStream />} />
            <Route path="/update" element={<Update />} />
          </Route>

          

          <Route element={<PrivateRoute />}>
            <Route path="/chatroom" element={<ChatRoom />} />
            {/* 마이페이지 */}
            <Route path="/user/:userId/mypage" element={<UserMyPage />}>
              <Route path="" element={<UserMain />} />
              <Route path="tour" element={<UserTourBoard />}>
                <Route path="" element={<UserScheduledBoard />} />
                <Route path="ended" element={<UserEndedBoard />} />
                <Route path="canceled" element={<UserCanceledBoard />} />
              </Route>
              <Route path="wish" element={<UserWishBoard />} />
              <Route path="following" element={<UserFollowingBoard />} />
              <Route path="review" element={<UserReviewBoard />} />
            </Route>
          </Route>

          <Route element={<GuideRoute />}>
            <Route path="/tour/write" element={<TourRegistration />} />
            <Route path="/tour/:tourId/update" element={<TourUpdate />} />
          </Route>

          <Route path="/tour" element={<TourBoard />} />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          {/* <Route path="/guide/:userId/detail" element={<GuideDetail />} /> */}

          <Route element={<PrivateRoute />}>
            {/* 가이드페이지 */}
            <Route path="/guide/:urlId/mypage" element={<GuideMyPage />}>
              <Route path="" element={<GuideMain />} />
              <Route path="follower" element={<GuideFollower />} />
              <Route path="tour" element={<GuideTourBoard />}>
                <Route path="" element={<GuideScheduledBoard />} />
                <Route path="ended" element={<GuideEndedBoard />} />
                <Route path="canceled" element={<GuideCanceledBoard />} />
                <Route path="test" element={<TestPage />} />
              </Route>
            </Route>
          </Route>

          <Route element={<UserRoute />}>
            <Route path="/review/:tourId/write" element={<ReviewWrite />} />
            <Route path="/review/:reviewId/edit" element={<ReviewEdit />} />
            <Route path="/mate/:tourId/write" element={<MateWrite />} />
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
        <Route path="/teachable" element={<TestTest />} />
      </Routes>
    </>
  );
}

export default App;
