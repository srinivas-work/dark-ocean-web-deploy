import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import styles from "./TeamsCarousel.module.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import PdfCard from "../../../UI/Cards/PdfCard/PdfCard";
import FlipBookViewer from "../../FlipBookViewer/FlipBookViewer";

import { CSSProperties } from "react";
import AnimatedText from "../../../UI/AnimatedText/AnimatedText";

const swiperStyles: CSSProperties = {
  ["--swiper-pagination-color" as any]: "var(--primary-blue)",
  ["--swiper-pagination-bullet-size" as any]: "0.6rem",
  ["--swiper-pagination-bullet-horizontal-gap" as any]: "0.4rem",
  //"--swiper-pagination-bullet-inactive-color": "#999999",
  //"--swiper-pagination-bullet-inactive-opacity": "1",
};

const TeamsCarousel: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  ...props
}) => {
  const slideImgList = [
    "/publication-items/pic1.jpg",
    "/publication-items/pic2.jpg",
    "/publication-items/pic3.jpg",
    "/publication-items/pic4.jpg",
    "/publication-items/pic5.jpg",
    "/publication-items/pic6.jpg",
    "/publication-items/pic7.jpg",
  ];
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className={`${styles.carouselWrapper} ${props.className}`} {...props}>
      <AnimatedText
        el={"h1"}
        text="Meet Our Team"
        style={{ marginBottom: "3rem", textAlign: "center" }}
      />
      <Swiper
        //slidesPerView={3} // Adjust for desired number of visible slides
        //spaceBetween={30}
        modules={[EffectCoverflow, Pagination]}
        centeredSlides
        loop
        initialSlide={slideImgList.length - 2}
        pagination={{ clickable: true }}
        effect="coverflow"
        grabCursor
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        className={styles["swiper-container"]}
        style={swiperStyles}
      >
        {slideImgList.map((slideImgLink, index) => (
          <SwiperSlide
            key={index}
            className={styles["swiper-slide"]}
            onClick={openPopup}
          >
            <PdfCard imgLink={slideImgLink} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent} ref={popupRef}>
            <button className={styles.closeButton} onClick={closePopup}>
              ✕
            </button>
            <FlipBookViewer />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsCarousel;
