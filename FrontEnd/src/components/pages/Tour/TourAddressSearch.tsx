import axios from "axios";
import { useState, useEffect } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";
import { setLatitude, setLongitude } from "./TourCourseReducer";

const TourAddressSearch = ({ index }) => {
  const { courses } = useSelector((state: any) => state.tourCourse);
  const dispatch = useDispatch();
  const [fullAddress, setFullAddress] = useState("부산와Vr");
  const [center, setCenter] = useState({
    lat: courses[index]?.lat || 0,
    lng: courses[index]?.lon || 0,
  });

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
        console.log(location.y, location.x);
        dispatch(setLatitude({ index: index, lat: parseFloat(location.y) }));
        dispatch(setLongitude({ index: index, lon: parseFloat(location.x) }));
        console.log(location.x, location.y);
        setCenter({ lat: location.y, lng: location.x });
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
        <input
          type="text"
          onClick={postCode}
          value={fullAddress != "부산와Vr" ? fullAddress : ""}
        />
      </main>
      <Map
        center={center}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        <MapMarker position={center}>
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
