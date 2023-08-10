import { useState } from "react";

function TestPage() {
    const accessToken = localStorage.getItem("accessToken");

    const [tourId, setTourId] = useState("");

    const handleChangeTourId = (e) => {
        setTourId(e.target.value);
    }

    const startChat = async () => {
        try {
            const requestBody = {
                tourId: tourId,
              };

            const response = await fetch("https://busanwavrserver.store/chatroom/start", {
              method: "POST",
              headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            });
            if (response.status === 200) {
              const data = await response.json();
              console.log("요청", requestBody);
              console.log("응답", data);
              alert(data.message);
            } else {
              console.log(data.message);
              alert(data.message);
            }
          } catch (error) {
            console.error(error);
          }
    }


  return (
    <div>
        <p>채팅 기능 테스트를 위해 임시로 만든 페이지입니다</p>
        <p>본인이 개설한 tourId를 확인하고 입력해주세요</p>

        <input type="text" 
            onChange={handleChangeTourId}
            placeholder="tourId"
            value={tourId}
        />
        <button type="button" onClick={startChat}>채팅 시작</button>
    </div>
  );
}

export default TestPage;
