import axios from "axios";
import { useState, useEffect } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";
import { setLatitude, setLongitude } from "./TourCourseReducer";

type TourAddressSearchProps = {
  index: number;
};

const TourAddressSearch = ({ index }: TourAddressSearchProps) => {
  const { courses } = useSelector((state: any) => state.tourCourse);
  const dispatch = useDispatch();
  const [fullAddress, setFullAddress] = useState("부산와Vr");
  const [center, setCenter] = useState({
    lat: courses[index]?.lat || 0,
    lng: courses[index]?.lon || 0,
  });
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [mapRenderCount, setMapRenderCount] = useState(0);

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

        if (response.data.documents && response.data.documents.length > 0) {
          const location = response.data.documents[0];
          dispatch(setLatitude({ index: index, lat: parseFloat(location.y) }));
          dispatch(setLongitude({ index: index, lon: parseFloat(location.x) }));
          setCenter({ lat: location.y, lng: location.x });
          setMapRenderCount((prev) => prev + 1); // Map 컴포넌트 렌더링 횟수 증가
        } else {
          console.error("해당 주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (searchCompleted) {
      fetchCoordinates();
    }
  }, [fullAddress, searchCompleted]);

  const postConfig = {
    onComplete: async (data: any) => {
      setFullAddress(data.address);
      setSearchCompleted(true);
    },
  };

  const postCode = ReactDaumPost(postConfig);

  return (
    <>
      <main>
        <div>
          우편번호찾기
          <input
            type="text"
            onClick={postCode}
            defaultValue={fullAddress != "부산와Vr" ? fullAddress : ""}
            readOnly
          />
        </div>
        {searchCompleted && mapRenderCount < 2 ? (
          <Map
            center={center}
            style={{
              width: "100%",
              height: "450px",
            }}
            level={3}
            key={mapRenderCount}
          >
            <MapMarker position={center}>
              <div style={{ padding: "5px", color: "#000" }}>
                {fullAddress}
                <br />
              </div>
            </MapMarker>
          </Map>
        ) : (
          <>
            <div>주소를 검색해보세요</div>
          </>
        )}
      </main>
    </>
  );
};

export default TourAddressSearch;
