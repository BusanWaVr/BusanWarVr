import { useEffect } from "react";
import TourAddressSearch from "./TourAddressSearch";
import TourImageUpload from "./TourImageUpload";
import Editor from "../../blocks/Editor";
import { styled } from "styled-components";

type TourCourseUploadProps = {
  index: number;
  courseKey: number;
  tourData: any;
  setTourData: any;
};

const TourCourseWrapper = styled.div`
  display: flex;
`;

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
      <TourCourseWrapper>
        <div>
          <TourAddressSearch
            index={index}
            courseKey={courseKey}
            tourData={tourData}
            setTourData={setTourData}
          />
          <input
            type="text"
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lon
            }
            onChange={handleLongitudeChange}
            disabled
            style={{ display: "none" }}
          />
          <input
            type="text"
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].lat
            }
            onChange={handleLatitudeChange}
            disabled
            style={{ display: "none" }}
          />
        </div>

        <div>
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
          <Editor
            value={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].content
            }
            onChange={handleContentChange}
          />
          <TourImageUpload
            imageFile={
              tourData.courses.filter(
                (course: any) => course.courseKey == courseKey
              )[0].image
            }
            setImageFile={(file) => handleImageFileChange(file)}
          />
        </div>
      </TourCourseWrapper>
    </>
  );
};

export default TourCourseUpload;
