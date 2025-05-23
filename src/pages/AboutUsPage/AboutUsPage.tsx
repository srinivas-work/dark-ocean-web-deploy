import { useRef } from "react";
import PartnersSection from "../../components/NormalComponents/AboutUsComponents/PartnersSection/PartnersSection";
import TeamsCarousel from "../../components/NormalComponents/AboutUsComponents/TeamsCarousel/TeamsCarousel";
import TimelineCarousel from "../../components/UI/TimelineCarousel/TimelineCarousel";
import {
  sustainabilityData,
  timelineData,
} from "../../components/utils/data/dataHolder";
import styles from "./AboutUsPage.module.css";
import AboutUsCardSection from "../../components/NormalComponents/AboutUsComponents/ServicesCardStack/AboutUsCardSection";

const AboutUsPage = () => {
  const holderComponentRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles["about-us-page"]} ref={holderComponentRef}>
      <TimelineCarousel dataSet={timelineData} scaleAnimate />
      <AboutUsCardSection />

      {/* <MissionSection className={styles["about-us-squeezed-sections"]} /> */}
      <TimelineCarousel showImg showHeading dataSet={sustainabilityData} />
      <TeamsCarousel />
      <PartnersSection
        heading="Our Partners"
        className={styles["about-us-squeezed-sections"]}
      />
      <PartnersSection
        heading="Our Certifications"
        className={styles["about-us-squeezed-sections"]}
      />
    </div>
  );
};

export default AboutUsPage;
