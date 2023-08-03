import TourAddressSearch from "./TourAddressSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setContent,
  setLatitude,
  setLongitude,
  setImageFile,
} from "./TourCourseReducer";

type TourCourseUploadProps = {
  index: number;
  course: any;
};

const TourCourseUpload: React.FC<TourCourseUploadProps> = ({
  index,
  course,
}) => {
  const { courses } = useSelector((state: any) => state.tourCourse);
  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ index: index, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent({ index: index, content: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageFile = files[0];
    dispatch(setImageFile({ index: index, imageFile: imageFile }));
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLongitude({ index: index, lon: parseFloat(e.target.value) }));
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLatitude({ index: index, lat: parseFloat(e.target.value) }));
  };

  return (
    <>
      <TourAddressSearch index={index} course={course} />
      <div>
        <label>
          위도:
          <input
            type="text"
            value={courses ? courses[index]?.lon : course.lon}
            onChange={handleLongitudeChange}
            disabled
          />
        </label>
        <label>
          경도:
          <input
            type="text"
            value={courses ? courses[index]?.lat : course.lat}
            onChange={handleLatitudeChange}
            disabled
          />
        </label>
        <label>
          제목:
          <input
            type="text"
            value={courses ? courses[index]?.title : course.title}
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
            value={courses ? courses[index]?.content : course.content}
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
