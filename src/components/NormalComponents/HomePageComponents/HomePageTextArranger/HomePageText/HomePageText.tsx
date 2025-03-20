import { HTMLMotionProps, motion } from "framer-motion";
import { useServiceOverlayStore } from "../../../../../../store/useOverlay";
import AnimatedText from "../../../../UI/AnimatedText/AnimatedText";
import useIsPhoneScreen from "../../../../utils/hooks/useIsPhoneScreen";
import styles from "./HomePageText.module.css";

const HomePageText: React.FC<
  HTMLMotionProps<"div"> & {
    isVisible: boolean;
    subHeading: string;
    heading: string;
    desc: string;
    centerText?: boolean;
    yPos?: number;
    makeDarkText?: boolean;
    addBlurBg?: boolean;
    headingTextWidth?: string;
  }
> = ({
  makeDarkText,
  isVisible,
  subHeading,
  heading,
  desc,
  centerText,
  yPos = 0,
  addBlurBg,
  headingTextWidth,
  ...props
}) => {
  const { toggle } = useServiceOverlayStore();
  const isPhoneScreen = useIsPhoneScreen();

  const getDarkTextStyle = () => {
    if (makeDarkText) {
      return { color: "var(--primary-blue)", opacity: 0.8 };
    }
    return {};
  };

  // useEffect(() => {
  //   const handleDocumentClick = (event: MouseEvent) => {
  //     if (!divRef.current) return;

  //     const rect = divRef.current.getBoundingClientRect();
  //     const { clientX, clientY } = event;

  //     // Check if the click happened inside the container
  //     const isInside =
  //       clientX >= rect.left &&
  //       clientX <= rect.right &&
  //       clientY >= rect.top &&
  //       clientY <= rect.bottom;

  //     if (isInside) {
  //       toggle();
  //     }
  //   };

  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //     document.body.style.cursor = "default"; // Reset cursor on unmount
  //   };
  // }, []);

  return (
    <motion.div
      className={styles["homepage-text-container-parent"]}
      style={
        centerText
          ? { marginLeft: "0", ...{ ...props.style } }
          : { ...{ ...props.style } }
      }
      initial={{ opacity: 0, y: 50 }} // Start faded and shifted down
      animate={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        y: isVisible ? yPos : 50,
      }} // Animate in/out
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      {...props}
    >
      <div
        className={`${styles["homepage-text-container"]} ${
          addBlurBg ? styles["add-blur-bg"] : ""
        }`}
        style={
          centerText
            ? {
                textAlign: "center",
                margin: "auto",
                maxWidth: headingTextWidth ? headingTextWidth : "50%",
              }
            : { alignItems: "start" }
        }
      >
        <h4 style={getDarkTextStyle()} onClick={toggle}>
          {subHeading}
        </h4>
        <AnimatedText
          el="h2"
          text={heading}
          blockAnimation
          style={
            isPhoneScreen && makeDarkText
              ? { color: "var(--primary-blue)", opacity: 0.8 }
              : {}
          }
          // /style={getDarkTextStyle()}
        />
        {/* <h1>{heading}</h1> */}
        {!isPhoneScreen && <p style={getDarkTextStyle()}>{desc}</p>}
        <button className={styles["homepage-service-btn"]} onClick={toggle}>
          View Details
        </button>
        {/* <button className={styles["homepage-service-btn"]}>
          <img src="/icons/arrow.svg" />
        </button> */}
      </div>
    </motion.div>
  );
};

export default HomePageText;
