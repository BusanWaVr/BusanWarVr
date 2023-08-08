import { useState, useEffect } from "react";
import styled from "styled-components";

import GuideRecoCard from "../../blocks/GuideRecoCard";

const Container = styled.div`
  height: 500px;
  // background-color: #999999;
`;


const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  // background-color: #565656;
`;

function DeadlineContainer() {

  const [guideRecoData, setGuideRecoData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://busanwavrserver.store/main/guide/recommend",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            console.log("가이드추천");
            const data = await response.json();
            setGuideRecoData(data.data);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
  
  }, []);

  return (
    <Container>
      <MentionsContainer>
      <h5>추천 가이드 랭킹</h5>
      </MentionsContainer>
      <GuideRecoCard guideRecoData={guideRecoData}/>
    </Container>
  );
}

export default DeadlineContainer;
