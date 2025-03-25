import { useRef } from "react";
import { useServiceOverlayStore } from "../../../store/useOverlay";
import BlinkingCircularButton from "../../components/UI/BlinkingCircularButton/BlinkingCircularButton";
import useIsPhoneScreen from "../../components/utils/hooks/useIsPhoneScreen";
import styles from "./ServicePage.module.css";
const ServicePage = () => {
  const { toggle } = useServiceOverlayStore();
  const isPhoneScreen = useIsPhoneScreen();

  const imgRef = useRef<HTMLImageElement>(null);

  //Rigging the image
  const handleMouseMove = (e: any) => {
    const img = imgRef.current;
    if (!img || isPhoneScreen) return;

    const { left, top, width, height } = img.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;

    const rotateX = y * -2.5; // Invert Y axis for natural feel
    const rotateY = x * 2.5;

    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) {
      img.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className={styles["service-page"]}>
      {/* <button
        style={{ position: "absolute", top: "5rem" }}
        onClick={() => serviceCircleClickHandler(3)} // Scroll to the 4th accordion (index 3)
      >
        Click Me
      </button> */}

      <BlinkingCircularButton
        style={{ position: "absolute", top: "20%" }} // 10rem = 160px → (160 / 800) * 100% = 20%
        onClick={toggle}
      />
      <BlinkingCircularButton
        style={{
          position: "absolute",
          top: isPhoneScreen ? "35%" : "50%",
          left: "32%",
        }} // 40rem = 640px → (640 / 800) * 100% = 80%; 20rem = 320px → (320 / 1000) * 100% = 32%
        onClick={toggle}
      />
      <BlinkingCircularButton
        style={{ position: "absolute", top: "30%", right: "48%" }} // 15rem = 240px → (240 / 800) * 100% = 30%; 30rem = 480px → (480 / 1000) * 100% = 48%
        onClick={toggle}
      />
      <BlinkingCircularButton
        style={{ position: "absolute", top: "30%", right: "32%" }} // 15rem = 240px → (240 / 800) * 100% = 30%; 20rem = 320px → (320 / 1000) * 100% = 32%
        onClick={toggle}
      />
      <div className={styles["service-page-header-img-wrapper"]}>
        <img
          ref={imgRef}
          className={styles["service-page-header-img"]}
          src="/img/service-page/do_service_page_header_opt.jpg"
          onMouseMove={isPhoneScreen ? undefined : handleMouseMove}
          onMouseLeave={isPhoneScreen ? undefined : handleMouseLeave}
        />
      </div>
    </div>
  );
};
export default ServicePage;
