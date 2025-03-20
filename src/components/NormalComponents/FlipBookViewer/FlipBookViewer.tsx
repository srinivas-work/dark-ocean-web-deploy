import { useEffect, useRef, useState } from "react";
import styles from "./FlipBookView.module.css";

const FlipBookViewer = () => {
  const embedRef = useRef<HTMLEmbedElement | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const openFlipBook = () => {
    setIsFlipbookOpen(true);
  };

  const closePopup = () => {
    setIsFlipbookOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };
    if (isFlipbookOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlipbookOpen]);

  useEffect(() => {
    const handleScroll = (event: any) => {
      // Prevent scrolling from bubbling up to the parent element
      event.stopPropagation();
    };

    // Attach scroll event listener to the child element
    if (embedRef.current) {
      const embedElement = embedRef.current;
      embedElement.addEventListener("scroll", handleScroll);

      // Cleanup function to remove event listener
      return () => {
        embedElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      {isFlipbookOpen ? (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent} ref={popupRef}>
            <button className={styles.closeButton} onClick={closePopup}>
              ✕
            </button>
            <embed
              className={styles["flip-book-container"]}
              ref={embedRef}
              src="/flipBook/index.html"
              title="Primsy Flipbook"
            />
          </div>
        </div>
      ) : (
        <button className={styles["open-flipbook-btn"]} onClick={openFlipBook}>
          <img src="/icons/doc.svg" alt="Open Doc" />
        </button>
      )}
    </>
  );
};

export default FlipBookViewer;
