import axios from "axios";
import { useState, useEffect } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const TourAddressSearch = () => {
  const [fullAddress, setFullAddress] = useState("부산와Vr");
  const [latitude, setLatitude] = useState(35.096171208475724);
  const [longitude, setLongitude] = useState(128.85357686495757);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,
          {
            headers: {
              Authorization: "KakaoAK 86dacd22ef09e09f5e2f1c1e37f5337b",
            },
          }
        );

        const location = response.data.documents[0];
        setLatitude(parseFloat(location.y));
        setLongitude(parseFloat(location.x));
        console.log(location.x, location.y);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [fullAddress]);

  const postConfig = {
    onComplete: async (data: any) => {
      console.log(data);
      setFullAddress(data.address);
    },
  };

  const postCode = ReactDaumPost(postConfig);

  return (
    <>
      <main>
        우편번호찾기
        <input type="text" onClick={postCode} />
      </main>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: latitude,
          lng: longitude,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={{
            // 인포윈도우가 표시될 위치입니다
            lat: latitude,
            lng: longitude,
          }}
        >
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          <div style={{ padding: "5px", color: "#000" }}>
            {fullAddress}
            <br />
          </div>
        </MapMarker>
      </Map>
    </>
  );
};

export default TourAddressSearch;
