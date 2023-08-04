import axios from "axios";
import { useState, useEffect } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type TourAddressSearchProps = {
  index: number;
  courseKey: number;
  tourData: any;
  setTourData: any;
};

const TourAddressSearch = ({
  index,
  courseKey,
  tourData,
  setTourData,
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
          const newCourses = [...tourData.courses];
          console.log(newCourses);
          newCourses.forEach((course, i) => {
            if (course.courseKey === courseKey) {
              newCourses[i].lat = parseFloat(location.y);
            }
          });
          newCourses.forEach((course, i) => {
            if (course.courseKey === courseKey) {
              newCourses[i].lon = parseFloat(location.x);
            }
          });
          setTourData({ ...tourData, courses: newCourses });
        } else {
          console.log(fullAddress);
          console.error("해당 주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (fullAddress != "부산와Vr") {
      fetchCoordinates();
    }
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
        {tourData.courses.filter((course: any) => course.courseKey == courseKey)[0]
          .lat != 0 ||
        tourData.courses.filter((course: any) => course.courseKey == courseKey)[0]
          .lon != 0 ? (
          <Map
            center={{
              lat: tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lat,
              lng: tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lon,
            }}
            style={{
              width: "100%",
              height: "450px",
            }}
            level={3}
          >
            <MapMarker
              position={{
                lat: tourData.courses.filter(
                  (course: any) => course.courseKey == courseKey
                )[0].lat,
                lng: tourData.courses.filter(
                  (course: any) => course.courseKey == courseKey
                )[0].lon,
              }}
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
