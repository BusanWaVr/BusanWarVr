import React, { useState } from "react";
import axios from "axios";
import TourCourseUpload from "./TourCourseUpload";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "./TourCourseReducer";
import TourImageUpload from "./TourImageUpload";
import TourDatePicker from "./TourDatePicker";
import Editor from "../../blocks/Editor";

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

const MaxAllowedcategory = 5;
const MinRequiredcategory = 3;

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

type TourCourseInfo = {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: any;
  imageFile: File;
};

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

const TourRegistration: React.FC = () => {
  const { courses } = useSelector((state: any) => state.tourCourse);
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

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

  const [imageNum, setImageNum] = useState(1);
  const [coursesNum, setCoursesNum] = useState(1);
  const [selectedMinMember, setSelectedMinMember] = useState<number>(1);
  const [selectedMaxMember, setSelectedMaxMember] = useState<number>(2);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      if (tourData.category.length < MaxAllowedcategory) {
        setTourData((prevData) => ({
          ...prevData,
          category: [...prevData.category, value],
        }));
      } else {
        alert(
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
    if (coursesNum <= 2) {
      setCoursesNum(coursesNum + 1);
      dispatch(
        setCourses({
          lon: 0,
          lat: 0,
          title: "",
          content: "",
          image: null,
          imageFile: null,
        })
      );
    } else {
      alert("코스는 최대 3개까지 등록할 수 있습니다.");
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
      alert("최대인원보다 작거나 같아야 합니다.");
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
      alert("최소인원보다 크거나 같아야 합니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (tourData.category.length < MinRequiredcategory) {
      alert(`최소 ${MinRequiredcategory}개의 카테고리를 선택해 주세요.`);
      return;
    }

    tourData.courses = courses;

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

    for (let i = 0; i < tourData.courses.length; i++) {
      formData.append(
        `courses[${i}].lon`,
        JSON.stringify(tourData.courses[i].lon)
      );
      formData.append(
        `courses[${i}].lat`,
        JSON.stringify(tourData.courses[i].lat)
      );
      formData.append(
        `courses[${i}].title`,
        JSON.stringify(tourData.courses[i].title)
      );
      formData.append(
        `courses[${i}].content`,
        JSON.stringify(tourData.courses[i].content)
      );
      if (tourData.courses[i].imageFile) {
        formData.append(`courses[${i}].image`, tourData.courses[i].imageFile);
      }
    }

    try {
      const res = await axios.post("http://52.79.93.203/tour", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* 지역 */}
      <div>
        <span>지역</span>
        <select
          value={tourData.region}
          onChange={(e) => setTourData({ ...tourData, region: e.target.value })}
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
          onChange={(e) => setTourData({ ...tourData, title: e.target.value })}
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
        {Array.from({ length: imageNum }, (_, index) => (
          <TourImageUpload
            key={index}
            imageNum={imageNum}
            setImageNum={setImageNum}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        ))}
      </div>

      {/* 여행 날짜 */}
      <div>
        <p>투어 기간</p>
        <TourDatePicker setTourData={setTourData} />
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
      {Array.from({ length: coursesNum }, (_, index) => (
        <TourCourseUpload key={index} index={index} />
      ))}

      <div onClick={increaseCoursesNum}>
        <button>장소 추가</button>
      </div>

      <button onClick={handleSubmit}>투어 등록</button>
    </div>
  );
};

export default TourRegistration;
