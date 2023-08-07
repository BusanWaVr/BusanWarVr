import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Course {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}
const TourDetailCourse = ({ lon, lat, title, content, image }: Course) => {
  return (
    <>
      <Map
        center={{ lat: lat, lng: lon }}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        <MapMarker position={{ lat: lat, lng: lon }}></MapMarker>
      </Map>
      <p>제목 : {title}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <img src={image} alt="" />
      <hr />
    </>
  );
};

export default TourDetailCourse;
