import TourAddressSearch from "./TourAddressSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setContent,
  setImage,
  setLatitude,
  setLongitude,
  setImageFile,
} from "./TourCourseReducer";

type TourCourseUploadProps = {
  index: number;
};

const TourCourseUpload: React.FC<TourCourseUploadProps> = ({ index }) => {
  const { courses } = useSelector((state: any) => state.tourCourse);
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(setTitle({ index: index, title: e.target.value }));
    console.log(courses);
  };

  const handleContentChange = (e) => {
    dispatch(setContent({ index: index, content: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    const imageFile = files[0];
    dispatch(setImageFile({ index: index, imageFile: imageFile }));
  };

  const handleLongitudeChange = (e) => {
    dispatch(setLongitude({ index: index, lon: e.target.value }));
  };

  const handleLatitudeChange = (e) => {
    dispatch(setLatitude({ index: index, lat: e.target.value }));
  };

  return (
    <>
      <TourAddressSearch index={index} />
      <div>
        <label>
          위도:
          <input
            type="text"
            value={courses[index]?.lon}
            onChange={handleLongitudeChange}
          />
        </label>
        <label>
          경도:
          <input
            type="text"
            value={courses[index]?.lat}
            onChange={handleLatitudeChange}
          />
        </label>
        <label>
          제목:
          <input
            type="text"
            value={courses[index]?.title}
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
            value={courses[index]?.content}
            onChange={handleContentChange}
          />
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
