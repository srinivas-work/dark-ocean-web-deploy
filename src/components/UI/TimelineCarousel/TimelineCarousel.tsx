import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { TimelineItemType } from "../../utils/types/customDataTypes";
import AnimatedText from "../AnimatedText/AnimatedText";
import TimelineCard from "../Cards/TimelineCard/TimelineCard";
import styles from "./TimelineCarousel.module.css";

const milestones = [
  { year: 2022, position: 10, progress: 0.1 }, // First marker at 10% progress
  { year: 2023, position: 40, progress: 0.4 }, // Second at 40%
  { year: 2024, position: 70, progress: 0.7 }, // Third at 70%
];

const TimelineCarousel: React.FC<{
  showImg?: boolean;
  showHeading?: boolean;
  dataSet: TimelineItemType[];
  scaleAnimate?: boolean;
}> = ({ showImg, showHeading, scaleAnimate, dataSet }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const containerRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [progressValue, setProgressValue] = useState(0.1);

  // Track scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressValue(Math.max(latest, 0.1));
  });

  // Calculate pixel values based on container width
  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth;

      setStartX(containerWidth * 0.01); // 1% of container width
      setEndX(-(contentWidth - containerWidth * 0.95)); // -95% of remaining scrollable width
    }
  }, []);

  const transform = useTransform(scrollYProgress, [0, 1], [startX, endX]);
  const adjustedProgress = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  const handleMarkerClick = (progress: number) => {
    if (targetRef.current) {
      const section = targetRef.current;
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;

      // Calculate the pixel scroll position based on the section's height
      const targetScrollY = sectionTop + sectionHeight * progress;

      // Smoothly scroll to the target position
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={targetRef} className={styles.section}>
      {showHeading && (
        <AnimatedText
          el={"h1"}
          text={"Our Sustainability Goals"}
          style={{
            marginBottom: "5rem",
            textAlign: "center",
          }}
        />
      )}
      <div ref={containerRef} className={styles.stickyContainer}>
        <div className={styles["sticky-video-container"]}>
          {showImg ? (
            <></>
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={styles["video-background"]}
            >
              <source
                src="/video/about-us/water_splash_white_bg.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <motion.div style={{ x: spring }} className={styles.cardsContainer}>
          {dataSet.map((timelineDataItem, index) => {
            const getTimelineStyle = () => {
              const widthStyle = { width: showImg ? "100vw" : "70vw" };

              if (index === 1)
                return {
                  justifyContent: "center",
                  ...widthStyle,
                };
              if (index === 2)
                return {
                  justifyContent: "end",
                  ...widthStyle,
                };
              return {
                justifyContent: "start",
                ...widthStyle,
              };
            };
            return scaleAnimate ? (
              <motion.div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: showImg ? "100vw" : "70vw",
                }}
                animate={{
                  scale: progressValue >= milestones[index].progress ? 1 : 0.7,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <TimelineCard
                  timelineDataItem={timelineDataItem}
                  key={index}
                  style={getTimelineStyle()}
                  showImg={showImg}
                  imgLink={timelineDataItem.imgLink}
                />
              </motion.div>
            ) : (
              <TimelineCard
                timelineDataItem={timelineDataItem}
                key={index}
                style={getTimelineStyle()}
                showImg={showImg}
                imgLink={timelineDataItem.imgLink}
              />
            );
          })}
        </motion.div>

        {/* Progress Bar */}
        {!showImg && (
          <div className={styles.progressBarContainer}>
            <motion.div
              className={styles.progressBar}
              style={{ scaleX: adjustedProgress }}
            />

            {/* Scroll Markers */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={styles.progressMarkerHolder}
                style={{ left: `${milestone.position}%` }}
              >
                <motion.div
                  className={styles.progressMarker}
                  initial={{ opacity: 0.2, scale: 1 }}
                  animate={{
                    opacity: progressValue >= milestone.progress ? 1 : 0.2,
                    //scale: progressValue >= milestone.progress ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleMarkerClick(milestone.progress)}
                >
                  <p>{milestone.year}</p>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TimelineCarousel;

{
  /* <motion.div
className={styles["progress-marker"]}
style={{ left: `${milestone.position}%` }}
key={index}
initial={{ opacity: 0, scale: 0 }}
animate={{
  opacity: progressValue >= milestone.progress ? 1 : 0,
  scale: progressValue >= milestone.progress ? 1 : 0,
}}
transition={{ duration: 0.3 }}
>
<p className={styles["progress-marker-text"]}>
  {milestone.year}
</p>
<motion.div
  className={styles["progress-marker-circle"]}
  initial={{ opacity: 0, scale: 0 }}
  animate={{
    opacity: progressValue >= milestone.progress ? 1 : 0,
    scale: progressValue >= milestone.progress ? 1 : 0,
  }}
  transition={{ duration: 0.3 }}
/>
</motion.div> */
}
