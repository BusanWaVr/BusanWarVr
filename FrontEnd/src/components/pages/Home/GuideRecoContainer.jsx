import { useState, useEffect } from "react";
import styled from "styled-components";
import { useI18n } from "../../../hooks/useI18n";
import GuideRecoCard from "../../blocks/GuideRecoCard";

const Container = styled.div`
  height: calc(100% - 4rem);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DeadlineContainer() {
  const t = useI18n();
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
        <h5 className="font-bold text-3xl md:text-4xl text-blue-500 my-12">
          {t(`추천 가이드 랭킹`)}
        </h5>
      </MentionsContainer>
      <GuideRecoCard guideRecoData={guideRecoData} />
    </Container>
  );
}

export default DeadlineContainer;
