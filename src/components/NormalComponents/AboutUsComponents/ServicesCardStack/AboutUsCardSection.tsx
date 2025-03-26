import { useScroll } from "framer-motion";
import { useRef } from "react";
import styles from "./AboutUsCardSection.module.css";
import AnimatedText from "../../../UI/AnimatedText/AnimatedText";
import { aboutUsCardList } from "../../../utils/data/dataHolder";
import AboutUsCard from "../../../UI/Cards/ServicesCard/AboutUsCard";

const AboutUsCardSection = () => {
  const serviceSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: serviceSectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="services-section"
      aria-label="services-section"
      className={styles["services-section"]}
      ref={serviceSectionRef}
    >
      <AnimatedText
        el={"h1"}
        text="Perfection To The Last Detail"
        style={{ marginBottom: "5rem" }}
      />

      <div className={styles["services-card-container"]}>
        {aboutUsCardList.map((cardItem, index) => {
          const targetScale = 1 - (aboutUsCardList.length - index) * 0.05;

          return (
            <AboutUsCard
              cardItem={cardItem}
              index={index}
              range={[index * 0.16, 1]}
              parentScrollProgress={scrollYProgress}
              targetScale={targetScale}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AboutUsCardSection;
