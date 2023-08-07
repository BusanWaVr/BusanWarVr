import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TourCourseUpload from "./TourCourseUpload";
import TourImageUpload from "./TourImageUpload";
import TourDatePicker from "./TourDatePicker";
import { TourGuidelineCheck } from "./TourGuildelineCheck";
import Editor from "../../blocks/Editor";
import axios from "axios";
import { toast } from "react-toastify";

type TourData = {
  region: string;
  category: string[];
  title: string;
  subTitle: string;
  content: string;
  tourImgs: any[];
  startDate: Date;
  endDate: Date;
  minMember: number;
  maxMember: number;
  courses: TourCourseInfo[];
};

type TourCourseInfo = {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: File | null | string;
  courseKey: number;
};

const MaxAllowedcategory = 5;

const regionList = [
  "강서구",
  "금정구",
  "기장군",
  "남구",
  "동구",
  "동래구",
  "부산진구",
  "북구",
  "사상구",
  "사하구",
  "서구",
  "수영구",
  "연제구",
  "영도구",
  "중구",
  "해운대구",
];

const categoryList = [
  { name: "힐링", label: "힐링" },
  { name: "액티비티", label: "액티비티" },
  { name: "체험", label: "체험" },
  { name: "도보", label: "도보" },
  { name: "캠핑", label: "캠핑" },
  { name: "호캉스", label: "호캉스" },
  { name: "맛집", label: "맛집" },
  { name: "도시", label: "도시" },
  { name: "자연", label: "자연" },
  { name: "문화", label: "문화" },
  { name: "쇼핑", label: "쇼핑" },
  { name: "역사", label: "역사" },
  { name: "축제", label: "축제" },
  { name: "핫플", label: "핫플" },
  { name: "카페", label: "카페" },
];

const TourUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { tourId } = useParams<{ tourId: string }>();
  const [tourData, setTourData] = useState<TourData>({
    region: "",
    category: [],
    title: "",
    subTitle: "",
    content: "",
    tourImgs: [],
    startDate: new Date(),
    endDate: new Date(),
    minMember: 1,
    maxMember: 2,
    courses: [],
  });
  const [selectedMinMember, setSelectedMinMember] = useState<number>(1);
  const [selectedMaxMember, setSelectedMaxMember] = useState<number>(2);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [courseKeySetting, setCourseKeySetting] = useState<number>(0);

  const { accessToken } = useSelector((state: any) => state.userInfo);

  const convertURLtoFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      const ext = url.split(".").pop();
      const metadata = { type: `image/${ext}` };
      const filename = url.split("/").pop();
      return new File([data], filename!, metadata);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`/api/tour/${tourId}`);
        if (response.status === 200) {
          const res = await response.json();

          let updatedTourData = {
            ...res.data,
            startDate: new Date(res.data.startDate),
            endDate: new Date(res.data.endDate),
          };

          const currentImageFiles = await Promise.all(
            res.data.tourImgs.map((imageURL) => convertURLtoFile(imageURL))
          );

          updatedTourData = { ...updatedTourData, tourImgs: currentImageFiles };

          const updatedCourses = await Promise.all(
            res.data.courses.map(async (course, index) => {
              if (course.image) {
                const imageFile = await convertURLtoFile(course.image);
                return {
                  ...course,
                  image: imageFile,
                  courseKey: index,
                };
              }
              return {
                ...course,
                courseKey: index,
              };
            })
          );

          updatedTourData = { ...updatedTourData, courses: updatedCourses };

          setTourData(updatedTourData);
          setImageFiles(currentImageFiles);
          setCourseKeySetting(res.data.courses.length);
        } else {
          toast.error("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchTourData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      if (tourData.category.length < MaxAllowedcategory) {
        setTourData((prevData) => ({
          ...prevData,
          category: [...prevData.category, value],
        }));
      } else {
        toast.warning(
          `카테고리는 최대 ${MaxAllowedcategory}개까지 선택할 수 있습니다.`
        );
      }
    } else {
      setTourData((prevData) => ({
        ...prevData,
        category: prevData.category.filter((cat) => cat !== value),
      }));
    }
  };

  const increaseCoursesNum = () => {
    if (tourData.courses.length <= 2) {
      const newCourse: TourCourseInfo = {
        lon: 0,
        lat: 0,
        title: "",
        content: "",
        image: null,
        courseKey: courseKeySetting,
      };
      setCourseKeySetting(courseKeySetting + 1);
      const newCourses = [...tourData.courses, newCourse];
      setTourData({ ...tourData, courses: newCourses });
    } else {
      toast.warning("코스는 최대 3개까지 등록할 수 있습니다.");
    }
  };

  const handleMinMemberClick = (value: number) => {
    if (value <= selectedMaxMember) {
      setSelectedMinMember(value);
      setTourData((prevData) => ({
        ...prevData,
        minMember: value,
      }));
    } else {
      toast.warning("최대인원보다 작거나 같아야 합니다.");
    }
  };

  const handleMaxMemberClick = (value: number) => {
    if (value >= selectedMinMember) {
      setSelectedMaxMember(value);
      setTourData((prevData) => ({
        ...prevData,
        maxMember: value,
      }));
    } else {
      toast.warning("최소인원보다 크거나 같아야 합니다.");
    }
  };

  const handleImageFileChange = (file: File | null, index: number) => {
    const newImageFiles = [...imageFiles];
    if (file) {
      newImageFiles[index] = file;
    } else {
      newImageFiles.splice(index, 1);
    }
    setImageFiles(newImageFiles);
  };

  const deleteCourse = (courseKey: number) => {
    const updatedCourses = tourData.courses.filter(
      (course) => course.courseKey !== courseKey
    );
    setTourData({ ...tourData, courses: updatedCourses });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!TourGuidelineCheck(tourData)) {
      return;
    }

    const formData = new FormData();

    formData.append("region", tourData.region);
    formData.append("title", tourData.title);
    formData.append("subTitle", tourData.subTitle);
    formData.append("content", tourData.content);
    formData.append("startDate", tourData.startDate.toISOString());
    formData.append("endDate", tourData.endDate.toISOString());
    formData.append("minMember", tourData.minMember.toString());
    formData.append("maxMember", tourData.maxMember.toString());

    let category = "";

    for (let i = 0; i < tourData.category.length; i++) {
      category += `${tourData.category[i]},`;
    }

    category = category.substr(0, category.length - 1);

    formData.append("category", category);

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("tourImgs", imageFiles[i]);
    }

    tourData.courses.forEach((course, i: number) => {
      if (course.lon != 0 || course.lat != 0) {
        formData.append(`courses[${i}].lon`, JSON.stringify(course.lon));
        formData.append(`courses[${i}].lat`, JSON.stringify(course.lat));
        formData.append(
          `courses[${i}].title`,
          JSON.stringify(course.title).replace(/"/g, "")
        );
        formData.append(
          `courses[${i}].content`,
          JSON.stringify(course.content).replace(/"/g, "")
        );
        if (tourData.courses[i].image) {
          formData.append(`courses[${i}].image`, course.image);
        }
      }
    });

    try {
      const res = await axios.put(`/api/tour/${tourId}`, formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === "200") {
        toast.success("게시글 수정이 완료되었습니다.");
        navigate(`/tour/${tourId}`);
      } else {
        console.log(res.data.message);
        toast.error("죄송합니다. 잠시후 다시 시도해 주세요.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {tourData ? (
        <div>
          {/* 지역 */}
          <div>
            <span>지역</span>
            <select
              value={tourData.region}
              onChange={(e) =>
                setTourData({ ...tourData, region: e.target.value })
              }
            >
              <option value="">Select Region</option>
              {regionList.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* 카테고리 */}
          <div>
            <span>카테고리</span>
            {categoryList.map((category) => (
              <label key={category.name}>
                <input
                  type="checkbox"
                  value={category.name}
                  checked={tourData.category.includes(category.name)}
                  onChange={handleCategoryChange}
                />
                {category.label}
              </label>
            ))}
          </div>

          {/* 제목 */}
          <div>
            <span>제목</span>
            <input
              type="text"
              placeholder="Title"
              value={tourData.title}
              onChange={(e) =>
                setTourData({ ...tourData, title: e.target.value })
              }
            />
          </div>

          {/* 서브 제목 */}
          <div>
            <span>서브 제목</span>
            <input
              type="text"
              placeholder="Sub Title"
              value={tourData.subTitle}
              onChange={(e) =>
                setTourData({ ...tourData, subTitle: e.target.value })
              }
            />
          </div>

          {/* 내용 */}
          <Editor
            value={tourData.content}
            onChange={(content: string) =>
              setTourData({ ...tourData, content: content })
            }
          />
          <div>
            <span>내용</span>
          </div>

          {/* 이미지 */}
          <div>
            <span>이미지</span>
            {Array.from(
              { length: imageFiles.length < 3 ? imageFiles.length + 1 : 3 },
              (_, index) => (
                <TourImageUpload
                  key={index}
                  imageFile={imageFiles[index] || null}
                  setImageFile={(file) => handleImageFileChange(file, index)}
                />
              )
            )}
          </div>

          {/* 여행 날짜 */}
          <div>
            <p>투어 기간</p>
            <TourDatePicker setTourData={setTourData} tourData={tourData} />
          </div>

          {/* 최소 인원 */}
          <div>
            <span>최소 인원 : </span>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <button
                key={value}
                onClick={() => handleMinMemberClick(value)}
                style={{
                  background: selectedMinMember === value ? "tomato" : "white",
                }}
              >
                {value}
              </button>
            ))}
          </div>

          {/* 최대 인원 */}
          <div>
            <span>최대 인원 : </span>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <button
                key={value}
                onClick={() => handleMaxMemberClick(value)}
                style={{
                  background: selectedMaxMember === value ? "tomato" : "white",
                }}
              >
                {value}
              </button>
            ))}
          </div>

          <hr />

          {/* 투어 코스 */}
          {tourData.courses &&
            tourData.courses.map((_, index: number) => (
              <div key={index}>
                <TourCourseUpload
                  index={index}
                  courseKey={tourData.courses[index].courseKey}
                  tourData={tourData}
                  setTourData={setTourData}
                />
                <button
                  onClick={() =>
                    deleteCourse(tourData.courses[index].courseKey)
                  }
                >
                  투어 삭제
                </button>
              </div>
            ))}

          <div onClick={increaseCoursesNum}>
            <button>장소 추가</button>
          </div>

          <button onClick={handleSubmit}>수정하기</button>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default TourUpdate;
