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
  courses: {
    lon: number;
    lat: number;
    title: string;
    content: string;
    image: File | null | string;
    courseKey: number;
  }[];
};

const MinRequiredcategory = 3;

export const TourGuidelineCheck = (tourData: TourData) => {
  console.log(tourData);
  if (tourData.region === "") {
    toast.warning("지역을 선택해주세요.");
    return false;
  }
  if (tourData.category.length < MinRequiredcategory) {
    toast.warning(`최소 ${MinRequiredcategory}개의 카테고리를 선택해 주세요.`);
    return false;
  }
  if (tourData.title === "") {
    toast.warning("제목을 입력해주세요.");
    return false;
  }
  if (tourData.subTitle === "") {
    toast.warning("부제목을 입력해주세요.");
    return false;
  }
  if (tourData.content === "") {
    toast.warning("내용을 입력해주세요.");
    return false;
  }
  if (tourData.startDate < new Date() || tourData.endDate < new Date()) {
    toast.warning("투어 일자 혹은 시간을 확인해주세요.");
    return false;
  }
  if (!tourData.courses || tourData.courses.length === 0) {
    toast.warning("코스를 최소 1개 이상 등록해주세요.");
    return false;
  }
  tourData.courses.map((course, i) => {
    if (course.lat == 0 && course.lon == 0) {
      toast.warning(`${i + 1}번째 코스의 주소를 입력해주세요.`);
      return false;
    }
    if (course.title === "") {
      toast.warning(`${i + 1}번째 코스의 제목을 입력해주세요.`);
      return false;
    }
    if (course.content == "") {
      toast.warning(`${i + 1}번째 코스의 내용을 입력해주세요.`);
      return false;
    }
  });

  return true;
};
