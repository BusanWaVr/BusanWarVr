import { useState, useEffect } from "react";
import styled from "styled-components";

import DeadCard from "../../blocks/DeadCard";
import { useI18n } from "../../../hooks/useI18n";
import "./DeadlineContainer.css";

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

  const [deadlineData, setDeadlineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://busanwavrserver.store/main/deadline",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setDeadlineData(data.data.nearDeadlineTours);
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
    <section>
      <Container>
        <MentionsContainer>
          <h5 className="font-bold text-3xl md:text-4xl text-white my-6">
            {t(`마감 임박! 같이 출발해요`)}
          </h5>
        </MentionsContainer>
        <DeadCard deadlineData={deadlineData} />
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
      </Container>
    </section>
  );
}

export default DeadlineContainer;
