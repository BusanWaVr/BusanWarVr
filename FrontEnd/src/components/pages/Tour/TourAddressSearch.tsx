import axios from "axios";
import { useState, useEffect } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type TourAddressSearchProps = {
  index: number;
  courses: any;
  setCoursesData: any;
};

const TourAddressSearch = ({
  index,
  courses,
  setCoursesData,
}: TourAddressSearchProps) => {
  const [fullAddress, setFullAddress] = useState("부산와Vr");

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
          const newCourses = [...courses];
          newCourses[index].lat = parseFloat(location.y);
          newCourses[index].lon = parseFloat(location.x);
          setCoursesData(newCourses);
        } else {
          console.error("해당 주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [fullAddress]);

  const postConfig = {
    onComplete: async (data: any) => {
      setFullAddress(data.address);
    },
  };

  const postCode = ReactDaumPost(postConfig);

  return (
    <>
      <main>
        <div>
          우편번호찾기
          <input type="text" onClick={postCode} defaultValue={""} readOnly />
        </div>
        {courses[index].lat != 0 || courses[index].lon != 0 ? (
          <Map
            center={{ lat: courses[index].lat, lng: courses[index].lon }}
            style={{
              width: "100%",
              height: "450px",
            }}
            level={3}
          >
            <MapMarker
              position={{ lat: courses[index].lat, lng: courses[index].lon }}
            ></MapMarker>
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
