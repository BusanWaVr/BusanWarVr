import { Map, MapMarker } from "react-kakao-maps-sdk";
import { styled } from "styled-components";

interface Course {
  index: number;
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}
const TourDetailCourse = ({
  index,
  lon,
  lat,
  title,
  content,
  image,
}: Course) => {
  const CourseWrapper = styled.div`
    border-left: 2px solid #1983ff;
    padding: 0 20px;
    margin: 40px 0;
    font-size: 14px;
    line-height: 24px;
    & h3 {
      font-size: 18px;
      font-weight: 600;
    }
  `;

  const CourseMedia = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 20px;
    & > .course-content {
      width: 50%;
    }
    & img {
      width: 200px;
      border-radius: 4px;
    }
  `;

  return (
    <>
      <CourseWrapper>
        <div className="course-content">
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <CourseMedia>
            <Map
              center={{ lat: lat, lng: lon }}
              style={{
                width: "200px",
                height: "150px",
                borderRadius: "4px",
              }}
              level={3}
            >
              <MapMarker position={{ lat: lat, lng: lon }}></MapMarker>
            </Map>
            <img src={image} alt="" />
          </CourseMedia>
        </div>
      </CourseWrapper>
    </>
  );
};

export default TourDetailCourse;
