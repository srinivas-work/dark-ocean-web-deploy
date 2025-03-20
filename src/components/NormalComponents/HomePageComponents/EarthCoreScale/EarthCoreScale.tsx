import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useHomepageScrollOffset } from "../../../../../store/useHomepageScroll";
import { earthCoreScaleData } from "../../../utils/data/dataHolder";
import { EarthCoreScaleDataInfoType } from "../../../utils/types/customDataTypes";
import styles from "./EarthCoreScale.module.css";

const EarthCoreScaleInfo: React.FC<{
  earthCoreScaleDatInfoItem: EarthCoreScaleDataInfoType;
  index: number;
  scrollOffset: number;
}> = ({ earthCoreScaleDatInfoItem, scrollOffset, index }) => {
  useEffect(() => {
    const allIndexes = [0, 1, 2, 3]; // The indexes for different divs
    let activeIndex = -1;

    if (scrollOffset >= 0.69 && scrollOffset <= 0.75) activeIndex = 0;
    else if (scrollOffset > 0.75 && scrollOffset <= 0.81) activeIndex = 1;
    else if (scrollOffset > 0.81 && scrollOffset <= 0.87) activeIndex = 2;
    else if (scrollOffset > 0.87 && scrollOffset <= 0.91) activeIndex = 3;

    allIndexes.forEach((index) => {
      gsap.to(`#scale-info-${index}`, {
        opacity: index === activeIndex ? 1 : 0, // Only active one is visible
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, [scrollOffset]);

  return (
    <div
      id={`scale-info-${index}`}
      className={styles["scale-info-container"]}
      style={{
        opacity: 0,
      }}
    >
      {/* <p>{earthCoreScaleDatInfoItem.depth}m</p> */}
      <p>
        {index === 3 && ">"}
        {earthCoreScaleDatInfoItem.depth}m
      </p>
      <div className={styles["scale-info-img-container"]}>
        <img src={earthCoreScaleDatInfoItem.coreTexture} />
      </div>
    </div>
  );
};

const EarthCoreScale = () => {
  const scrollOffset = useHomepageScrollOffset();
  const earthcoreScaleRef = useRef<HTMLDivElement>(null);

  const earthCoreScaleImgRef = useRef<HTMLImageElement>(null);

  const targetScaleVisiblityPoint = 0.69;

  const targetScaleDisappearPoint = 0.91;

  useEffect(() => {
    // Opacity & Translation animation (existing)
    const targetOpacity =
      scrollOffset >= targetScaleVisiblityPoint &&
      scrollOffset <= targetScaleDisappearPoint
        ? 1
        : 0;
    // const targetTranslation =
    //   scrollOffset >= targetScaleVisiblityPoint &&
    //   scrollOffset <= targetScaleDisappearPoint
    //     ? 0
    //     : -80.5;

    if (earthcoreScaleRef.current) {
      gsap.to(earthcoreScaleRef.current, {
        opacity: targetOpacity,
        //translateY: `${targetTranslation}vh`,
        duration: 0.9,
        ease: "power2.out",
      });
    }

    // Clip-Path Animation based on Scroll Offset
    if (earthCoreScaleImgRef.current) {
      let clipValue = "inset(0 0 70% 0)"; // Default

      if (scrollOffset >= 0.69 && scrollOffset <= 0.75) {
        clipValue = "inset(0 0 70% 0)"; // Hold at 70%
      } else if (scrollOffset > 0.75 && scrollOffset <= 0.81) {
        clipValue = "inset(0 0 35% 0)"; // Jump to 35%
      } else if (scrollOffset > 0.81 && scrollOffset <= 0.87) {
        clipValue = "inset(0 0 5% 0)"; // Jump to 5%
      } else if (scrollOffset > 0.87 && scrollOffset <= 0.91) {
        clipValue = "inset(0 0 0% 0)"; // Fully visible
      }

      gsap.to(earthCoreScaleImgRef.current, {
        clipPath: clipValue,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [scrollOffset]);
  return (
    <div
      ref={earthcoreScaleRef}
      className={styles["earth-core-scale-container"]}
    >
      <img
        ref={earthCoreScaleImgRef}
        // className={`${styles["earth-core-scale-img"]} ${
        //   scrollOffset >= 0.51 && scrollOffset <= 0.65
        //     ? styles["animate-clip"]
        //     : ""
        // }`}
        className={styles["earth-core-scale-img"]}
        src="/img/home/earth_ruler_revised.svg"
      />

      <div className={styles["earth-core-scale-info-parent"]}>
        {earthCoreScaleData.map((earthCoreScaleDataItem, index) => (
          <EarthCoreScaleInfo
            earthCoreScaleDatInfoItem={earthCoreScaleDataItem}
            key={index}
            index={index}
            scrollOffset={scrollOffset}
          />
        ))}
      </div>
    </div>
  );
};

export default EarthCoreScale;
