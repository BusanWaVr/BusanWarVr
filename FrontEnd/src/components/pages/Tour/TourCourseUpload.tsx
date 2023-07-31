import React, { useState, useEffect } from "react";
import TourAddressSearch from "./TourAddressSearch";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "./TourCourseReducer";

const TourCourseUpload = ({ index }) => {
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const { courses } = useSelector((state) => state.tourCourse);
  const dispatch = useDispatch();

  useEffect(()=>{
    setCourse({lon: longitude, lat: latitude,  })
  }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setCourse({ ...course, title: title });
    setCourses({ index: index, course: course });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  return (
    <>
      <TourAddressSearch longitude={longitude} latitude={latitude} />
      <div>
        <label>
          위도:
          <input
            type="text"
            value={longitude}
            onChange={handleLongtitudeChange}
          />
        </label>
        <label>
          경도:
          <input type="text" value={latitude} onChange={handleLatitudeChange} />
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
    </>
  );
};

export default TourCourseUpload;
