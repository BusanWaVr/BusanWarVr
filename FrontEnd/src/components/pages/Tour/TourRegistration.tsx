import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

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
const MaxTourImgs = 3;

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

type TourData = {
  region: string;
  category: string[];
  title: string;
  subTitle: string;
  content: string;
  tourImgs: string[];
  startDate: Date;
  endDate: Date;
  minMember: number;
  maxMember: number;
  courses: string[];
};

const TourRegistration: React.FC = () => {
  const [tourData, setTourData] = useState<TourData>({
    region: "",
    category: [], // 카테고리를 빈 배열로 초기화
    title: "",
    subTitle: "",
    content: "",
    tourImgs: [] as string[], // tourImgs를 문자열 배열로 가정 (이미지 URL)
    startDate: new Date(),
    endDate: new Date(),
    minMember: 0,
    maxMember: 1,
    courses: [] as string[], // courses를 문자열 배열로 가정 (코스 설명)
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setTourData((prevData) => ({
      ...prevData,
      tourImgs: selectedImages.slice(0, MaxTourImgs), // 최대 이미지 수를 적용하여 설정
    }));
  };

  const [selectedMinMember, setSelectedMinMember] = useState<number>(1);
  const [selectedMaxMember, setSelectedMaxMember] = useState<number>(2);

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

  const handleSubmit = async () => {
    if (tourData.category.length < MinRequiredcategory) {
      alert(`최소 ${MinRequiredcategory}개의 카테고리를 선택해 주세요.`);
      return;
    }

    try {
      const response = await axios.post("http://52.79.93.203/tour", tourData);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
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
      <div>
        <span>제목</span>
        <input
          type="text"
          placeholder="Title"
          value={tourData.title}
          onChange={(e) => setTourData({ ...tourData, title: e.target.value })}
        />
      </div>
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
      <div>
        <span>내용</span>
        <textarea
          placeholder="Content"
          value={tourData.content}
          onChange={(e) =>
            setTourData({ ...tourData, content: e.target.value })
          }
        />
      </div>
      <div>
        <span>이미지</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <span>여행날짜</span>
        <DatePicker
          selected={tourData.startDate ? new Date(tourData.startDate) : null}
          dateFormat="MM월 dd일 (eee)"
          locale={ko}
          onChange={(date: Date) =>
            setTourData({ ...tourData, startDate: date })
          }
        />
        <DatePicker
          selected={tourData.endDate ? new Date(tourData.endDate) : null}
          dateFormat="MM월 dd일 (eee)"
          locale={ko}
          onChange={(date: Date) => setTourData({ ...tourData, endDate: date })}
        />
      </div>
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
      <textarea
        placeholder="Courses (Comma-separated descriptions)"
        value={tourData.courses.join(", ")}
        onChange={(e) =>
          setTourData({ ...tourData, courses: e.target.value.split(", ") })
        }
      />

      <div onClick={handleSubmit} style={{ cursor: "pointer" }}>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default TourRegistration;
