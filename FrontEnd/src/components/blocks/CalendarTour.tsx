import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import moment from "moment";
import BoogieThinking from "../../assets/boogie_thinking.png";
import { useI18n } from "../../hooks/useI18n"

const TourWrapper = styled.div`
  background-color: #b8daff47;
  height: 100%;
  border-radius: 5px;
  // padding: 20px 0;
`;

const NoTourWrapper = styled.div`
  height: 100%;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > img {
    width: 250px;
    filter: grayscale(30%);
  }
`;

interface TourData {
  region: string;
  tourId: string;
  title: string;
  subTitle: string;
  userId: string;
  profileImg: string;
  nickname: string;
  category: string[];
  startDate: string;
  endDate: string;
  minMember: number;
  maxMember: number;
  content: string;
  tourImgs: string[];
  joiners: Joiner[];
  canceled: boolean;
  ended: boolean;
  courses: Course[];
}

interface Course {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}

interface Joiner {
  profileImage: string;
  nickname: string;
  joinDate: string;
}

const CalendarTour = ({ selectedTour }) => {
  const t = useI18n()
  const [tourData, setTourData] = useState<TourData | null>(null);

  useEffect(() => {
    if (selectedTour) {
      const fetchTourData = async () => {
        try {
          const response = await fetch(
            `https://busanwavrserver.store/tour/${selectedTour.tourId}`
          );
          if (response.status === 200) {
            const res = await response.json();
            setTourData(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchTourData();
    }
  }, [selectedTour]);

  return (
    <>
      <TourWrapper>
        {selectedTour ? (
          <Link
            to={`../tour/${selectedTour?.tourId}`}
            className="flex flex-col h-full justify-center items-center"
          >
            <div className="pb-0 pt-2 px-4 flex-col items-start text-default-800">
              <p className="text-defaultg uppercase font-semibold">
                {moment(tourData?.startDate)
                  .utcOffset(9)
                  .format("YYYY/MM/DD HH:mm")}
              </p>

              <h4 className="font-bold text-large">{tourData?.title}</h4>
            </div>
            <div className="overflow-visible py-1 px-6 flex">
              <img
                alt="Card background"
                className="object-cover rounded-xl h-48 w-full"
                src={tourData?.tourImgs[0]}
                width={270}
              />
            </div>
          </Link>
        ) : (
          <NoTourWrapper>
            <p className="font-bold">{t(`예정된 투어가 없습니다.`)}</p>
            <img src={BoogieThinking} alt="" />
          </NoTourWrapper>
        )}
      </TourWrapper>
    </>
  );
};

export default CalendarTour;
