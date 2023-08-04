import TourAddressSearch from "./TourAddressSearch";
import TourImageUpload from "./TourImageUpload";

type TourCourseUploadProps = {
  index: number;
  courses: any;
  setCoursesData: any;
};

const TourCourseUpload: React.FC<TourCourseUploadProps> = ({
  index,
  courses,
  setCoursesData,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...courses];
    newCourses[index].title = e.target.value;
    setCoursesData(newCourses);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCourses = [...courses];
    newCourses[index].content = e.target.value;
    setCoursesData(newCourses);
  };

  const handleImageFileChange = (file: File | null) => {
    const newCourses = [...courses];
    newCourses[index].image = file;
    setCoursesData(newCourses);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...courses];
    newCourses[index].lon = e.target.value;
    setCoursesData(newCourses);
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...courses];
    newCourses[index].lat = e.target.value;
    setCoursesData(newCourses);
  };

  return (
    <>
      <TourAddressSearch
        index={index}
        courses={courses}
        setCoursesData={setCoursesData}
      />
      <div>
        <label>
          위도:
          <input
            type="text"
            value={courses[index].lon}
            onChange={handleLongitudeChange}
            disabled
          />
        </label>
        <label>
          경도:
          <input
            type="text"
            value={courses[index].lat}
            onChange={handleLatitudeChange}
            disabled
          />
        </label>
        <label>
          제목:
          <input
            type="text"
            value={courses[index].title}
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
            value={courses[index].content}
            onChange={handleContentChange}
          />
        </label>
        <TourImageUpload
          imageFile={courses[index].image}
          setImageFile={(file) => handleImageFileChange(file)}
        />
      </div>
    </>
  );
};

export default TourCourseUpload;
