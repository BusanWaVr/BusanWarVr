import TourDetailCourse from "./TourDetailCourse";
import { EnvironmentFilled } from "@ant-design/icons";
import { AccessTime, Groups } from "@mui/icons-material";
import { Divider, Space, Tag } from "antd";
import { styled } from "styled-components";
import CurrentMate from "../../../blocks/CurrentMate";
import { useI18n } from "../../../../hooks/useI18n"

const TourDetailContentWrapper = styled.div`
  width: 700px;
  text-align: left;
  margin-bottom: 40px;
  & > h1 {
    font-size: 32px;
    font-weight: 700;
  }
  & > h2 {
    font-size: 24px;
  }
  & > .section-title {
    font-size: 24px;
    color: #1983ff;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const TourDetailContentTags = styled.div`
  padding: 20px 0;
`;

const TourContentInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & p {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

const TourContentImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 20px;
  &: last-child {
    margin-bottom: 0;
  }
`;

const TourDetailContent = ({ tourData, joiners }) => {
  const t = useI18n()
  return (
    <>
      <TourDetailContentWrapper>
        <TourDetailContentTags>
          <Space size={[0, 8]} wrap>
            <Tag color="blue" icon={<EnvironmentFilled />}>
              {tourData.region}
            </Tag>
            {tourData.category.map((c, i) => (
              <Tag color="geekblue" key={i}>
                {c}{" "}
              </Tag>
            ))}
          </Space>
        </TourDetailContentTags>
        <h1>{tourData.title}</h1>
        <h2>{tourData.subTitle}</h2>
        <Divider />
        <TourContentInfo>
          <p>
            <AccessTime />
            {(new Date(tourData.endDate).getTime() -
              new Date(tourData.startDate).getTime()) /
              (1000 * 60)}
            {t(`분 소요`)}
          </p>
          <Divider type="vertical" />
          <p>
            <Groups />
            {tourData.minMember}{t(`명`)} ~ {tourData.maxMember}{t(`명`)}
          </p>
        </TourContentInfo>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: tourData.content }} />
        <Divider />
        <div>
          {tourData.tourImgs.map((url, i) => (
            <TourContentImage key={i} src={url} alt="" />
          ))}
        </div>
        <Divider />
        <p className="section-title"> {t(`코스 소개`)} </p>
        {tourData.courses.map((course, index) => (
          <TourDetailCourse
            key={index}
            index={index}
            lon={course.lon}
            lat={course.lat}
            title={course.title}
            content={course.content}
            image={course.image}
          />
        ))}
        <Divider />
        <p className="section-title">{t(`현재 모집 현황`)}</p>
        <CurrentMate tourData={tourData} joiners={joiners} />
      </TourDetailContentWrapper>
    </>
  );
};

export default TourDetailContent;
