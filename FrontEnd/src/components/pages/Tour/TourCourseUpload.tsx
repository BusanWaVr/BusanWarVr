import React from "react";
import TourAddressSearch from "./TourAddressSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  setLongitude,
  setLatitude,
  setTitle,
  setContent,
  setImage,
} from "./TourCourseReducer";

type TourCourseInfo = {
  lon: number | null;
  lat: number | null;
  title: string;
  content: string;
  image: any;
};

const TourCourseUpload = () => {
  const { lon, lat, title, content, image } = useSelector(
    (state) => state.tourCourse
  );
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleContentChange = (e) => {
    dispatch(setContent(e.target.value));
  };

  const handleImageChange = (e) => {
    dispatch(setImage(e.target.value));
  };

  return (
    <>
      <TourAddressSearch />
      <div>
        <label>
          위도:
          <input type="text" value={lon} />
        </label>
        <label>
          경도:
          <input type="text" value={lat} />
        </label>
        <label>
          제목:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          내용:
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button> 장소 추가 </button>
    </>
  );
};

export default TourCourseUpload;
