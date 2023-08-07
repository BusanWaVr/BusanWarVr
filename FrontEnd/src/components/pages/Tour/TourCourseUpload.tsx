import { useEffect } from "react";
import TourAddressSearch from "./TourAddressSearch";
import TourImageUpload from "./TourImageUpload";
import Editor from "../../blocks/Editor";

type TourCourseUploadProps = {
  index: number;
  courseKey: number;
  tourData: any;
  setTourData: any;
};

const TourCourseUpload: React.FC<TourCourseUploadProps> = ({
  index,
  courseKey,
  tourData,
  setTourData,
}) => {
  useEffect(() => {
    console.log(courseKey);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...tourData.courses];
    newCourses.forEach((course, i) => {
      if (course.courseKey === courseKey) {
        newCourses[i].title = e.target.value;
      }
    });
    setTourData({ ...tourData, courses: newCourses });
  };

  const handleContentChange = (content: string) => {
    const newCourses = [...tourData.courses];
    newCourses.forEach((course, i) => {
      if (course.courseKey === courseKey) {
        newCourses[i].content = content;
      }
    });
    setTourData({ ...tourData, courses: newCourses });
  };

  const handleImageFileChange = (file: File | null) => {
    const newCourses = [...tourData.courses];
    newCourses.forEach((course, i) => {
      if (course.courseKey === courseKey) {
        newCourses[i].image = file;
      }
    });
    setTourData({ ...tourData, courses: newCourses });
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...tourData.courses];
    newCourses.forEach((course, i) => {
      if (course.courseKey === courseKey) {
        newCourses[i].lon = e.target.value;
      }
    });
    setTourData({ ...tourData, courses: newCourses });
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...tourData.courses];
    newCourses.forEach((course, i) => {
      if (course.courseKey === courseKey) {
        newCourses[i].lat = e.target.value;
      }
    });
    setTourData({ ...tourData, courses: newCourses });
  };

  return (
    <>
      <TourAddressSearch
        index={index}
        courseKey={courseKey}
        tourData={tourData}
        setTourData={setTourData}
      />
      <div>
        <label>
          위도:
          <input
            type="text"
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lon
            }
            onChange={handleLongitudeChange}
            disabled
          />
        </label>
        <label>
          경도:
          <input
            type="text"
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lat
            }
            onChange={handleLatitudeChange}
            disabled
          />
        </label>
        <label>
          제목:
          <input
            type="text"
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].title
            }
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <Editor
          value={
            tourData.courses.filter(
              (course: any) => course.courseKey == courseKey
            )[0].content
          }
          onChange={handleContentChange}
        />
        {/* <label>
          내용:
          <textarea
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].content
            }
            onChange={handleContentChange}
          />
        </label> */}
        <TourImageUpload
          imageFile={
            tourData.courses.filter(
              (course: any) => course.courseKey == courseKey
            )[0].image
          }
          setImageFile={(file) => handleImageFileChange(file)}
        />
      </div>
    </>
  );
};

export default TourCourseUpload;
