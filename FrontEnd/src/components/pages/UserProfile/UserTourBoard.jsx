import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router";
import { Tabs, Tab } from "@nextui-org/react";
import UserScheduledBoard from "./UserScheduledBoard";
import UserEndedBoard from "./UserEndedBoard";
import UserCanceledBoard from "./UserCanceledBoard";

function UserTourBoard() {
  const [userTourData, setUserTourData] = useState(null);
  const { userId } = useParams();
  const { isMe } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/user/tour/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setUserTourData(data.data);
        } else {
          alert("투어데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Tabs variant="underlined" aria-label="Tabs variants" color="primary">
        <Tab key="scheduled" title="예정된 투어">
          <UserScheduledBoard isMe={isMe} userTourData={userTourData} />
        </Tab>
        <Tab key="ended" title="지난 투어">
          <UserEndedBoard isMe={isMe} userTourData={userTourData} />
        </Tab>
        <Tab key="canceled" title="취소된 투어">
          <UserCanceledBoard userTourData={userTourData} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default UserTourBoard;
