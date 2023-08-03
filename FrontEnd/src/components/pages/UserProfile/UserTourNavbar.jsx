import React from "react";
import { Link } from "react-router-dom";

function UserTourNavbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/user/:userId/mypage/tour/">예정된 투어</Link>
        </li>
        <li>
          <Link to="/user/:userId/mypage/tour/ended">지난 투어</Link>
        </li>
        <li>
          <Link to="/user/:userId/mypage/tour/canceled">취소된 투어</Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserTourNavbar;
