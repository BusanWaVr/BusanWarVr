import { Link } from "react-router-dom";

function GuideNavbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/guide/:userId/mypage/">내 정보</Link>
        </li>
        <li>
          <Link to="/guide/:userId/mypage/follower/">팔로워</Link>
        </li>
        <li>
          <Link to="/guide/:userId/mypage/tour/">개설 투어</Link>
        </li>
      </ul>
    </nav>
  );
}

export default GuideNavbar;
