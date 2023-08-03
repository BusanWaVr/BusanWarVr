import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import GuideNavbar from "./GuideNavbar";
import GuideMini from "./GuideMini";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  // background-color: #343434;
`;

const NavbarWrapper = styled.div`
  width: 30%;
  // background-color: #505050;
`;

const OutletWrapper = styled.div`
  width: 70%;
  // background-color: #808080;
`;

function GuideMyPage() {
  // redux에서 userId 가져오기
  const { userId } = useSelector((state) => state.userInfo);
  const url = `http://52.79.93.203/guide/guideInfo/${userId}`;
  const [guideInfoData, setGuideInfoData] = useState(null);
  const [userInfoData, setUserInfoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log("유저정보 GET");
          const data = await response.json();
          setGuideInfoData(data.data);
          console.log("부모에서 자식으로 넘김", data.data);
        } else {
          alert("유저데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <NavbarWrapper>
        <GuideMini guideInfoData={guideInfoData} />
        <GuideNavbar />
      </NavbarWrapper>
      <OutletWrapper>
        <Outlet context={{ guideInfoData }} />
      </OutletWrapper>
    </Wrapper>
  );
}

export default GuideMyPage;
