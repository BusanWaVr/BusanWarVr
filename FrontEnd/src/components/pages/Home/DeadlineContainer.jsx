import { useState, useEffect } from "react";
import styled from "styled-components";

import DeadCard from "../../blocks/DeadCard";

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
            console.log("마감임박");
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
    <Container>
      <MentionsContainer>
      <h5>마감 임박! 같이 출발해요</h5>
      </MentionsContainer>
      <DeadCard deadlineData={deadlineData}/>
    </Container>
  );
}

export default DeadlineContainer;
