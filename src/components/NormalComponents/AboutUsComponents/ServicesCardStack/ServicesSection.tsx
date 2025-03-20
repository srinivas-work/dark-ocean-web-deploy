import { useScroll } from "framer-motion";
import { useRef } from "react";
import styles from "./ServicesSection.module.css";
import ServicesCard from "../../../UI/Cards/ServicesCard/ServicesCard";
import AnimatedText from "../../../UI/AnimatedText/AnimatedText";
import { servicesList } from "../../../utils/data/dataHolder";

const ServicesSection = () => {
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
        {servicesList.map((cardItem, index) => {
          const targetScale = 1 - (servicesList.length - index) * 0.05;

          return (
            <ServicesCard
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

export default ServicesSection;
