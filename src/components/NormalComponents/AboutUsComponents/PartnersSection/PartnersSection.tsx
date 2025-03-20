import React, { HTMLProps } from "react";
import styles from "./PartnersSection.module.css";
import AnimatedText from "../../../UI/AnimatedText/AnimatedText";
import { partnersData } from "../../../utils/data/dataHolder";
import PartnerCard from "../../../UI/Cards/PartnerCard/PartnerCard";

const PartnersSection: React.FC<
  HTMLProps<HTMLDivElement> & { heading: string }
> = ({ heading, ...props }) => {
  const cardClickHandler = () => {
    window.open("https://maps.app.goo.gl/4PE6kYdietdXar1X8", "_blank");
  };

  return (
    <section
      {...props}
      className={`${styles.partnersSection} ${props.className}`}
    >
      <AnimatedText
        el={"h1"}
        text={heading}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      />
      <div className={styles.partnersGrid}>
        {partnersData.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onClick={cardClickHandler}
          />
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
