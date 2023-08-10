import { styled } from "styled-components";
import BoogieThinking from "../../../assets/boogie_thinking.png";

const TourWrapper = styled.div`
  background-color: #b8daff47;
  height: 100%;
  border-radius: 5px;
  padding: 20px 0;
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

const UserCalendarTour = ({ selectedTour }) => {
  return (
    <>
      <TourWrapper>
        {selectedTour ? (
          <div>{selectedTour.title}</div>
        ) : (
          <NoTourWrapper>
            <p className="font-bold">예정된 투어가 없습니다.</p>
            <img src={BoogieThinking} alt="" />
          </NoTourWrapper>
        )}
      </TourWrapper>
    </>
  );
};

export default UserCalendarTour;
