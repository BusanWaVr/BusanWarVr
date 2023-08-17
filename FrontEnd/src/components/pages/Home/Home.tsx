import "./Home.css";
import styled from "styled-components";
import VideoContainer from "./VideoContainer";
import TourRecoContainer from "./TourRecoContainer";
import DeadlineContainer from "./DeadlineContainer";
import GuideRecoContainer from "./GuideRecoContainer";
import RegionContainer from "./RegionContainer";
import { SectionsContainer, Section } from "react-fullpage";

let options = {
  activeClass: "active", // the class that is appended to the sections links
  anchors: ["main", "region", "recommend", "deadline", "guide"], // the anchors for each sections
  arrowNavigation: true, // use arrow keys
  className: "SectionContainer", // the class name for the section container
  delay: 1000, // the scroll animation speed
  navigation: false, // use dots navigatio
  scrollBar: false, // use the browser default scrollbar
  sectionClassName: "Section", // the section class name
  sectionPaddingTop: "0", // the section top padding
  sectionPaddingBottom: "0", // the section bottom padding
  verticalAlign: false, // align the content of each section vertical
};

const Home: React.FC = () => {
  return (
    <SectionsContainer {...options}>
      <Section>
        <VideoContainer />
      </Section>
      <Section>
        <RegionContainer />
      </Section>
      <Section>
        <TourRecoContainer />
      </Section>
      <Section>
        <DeadlineContainer />
      </Section>
      <Section>
        <GuideRecoContainer />
      </Section>
    </SectionsContainer>
  );
};

export default Home;
