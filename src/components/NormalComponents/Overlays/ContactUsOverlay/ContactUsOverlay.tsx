import { motion } from "framer-motion";
import styles from "./ContactUsOverlay.module.css";
import { useEffect } from "react";
import { useContactOverlayStore } from "../../../../../store/useOverlay";
import { placeList } from "../../../utils/data/dataHolder";
import AddressCard from "../../../UI/Cards/AddressCard/AddressCard";
import CloseButton from "../../../UI/CloseButton/CloseButton";

const ContactUsOverlay = () => {
  const { isOpen, toggle } = useContactOverlayStore();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //     //document.body.style.maxHeight = "100vh";
  //   } else {
  //     document.body.style.overflow = "unset"; // Restore scrolling
  //     // document.body.style.maxHeight = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset"; // Cleanup when unmounting
  //     //document.body.style.maxHeight = "unset";
  //   };
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      window.scrollTo(
        0,
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--scroll-y"
          )
        )
      );
    }
  }, [isOpen]);

  return (
    <motion.div
      className={styles.contactContainer}
      initial={{ y: "-100%", opacity: 0 }} // Start off-screen (right side)
      animate={isOpen ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }} // Animate to view or hide
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 150, // Makes the spring snappier
        damping: 30, // Reduces excessive bouncing
        mass: 1.8, // Controls weight feel
      }}
    >
      <div className={styles.infoSection}>
        <div>
          <h2 className={styles.heading}>
            Collaboration, work enquiries or just say hello.
          </h2>
          <p className={styles.description}>
            <i>
              Basic Hydrography Survey to complex Seismic Surveys, we are here
              to help!
            </i>
          </p>
        </div>

        <div className={styles.contactDetails}>
          {placeList.map((placeItem, index) => {
            return <AddressCard placeItem={placeItem} key={index} />;
          })}
        </div>
      </div>

      <form className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <div className={styles.inputField}>
            <label>First Name *</label>
            <input type="text" placeholder="First name" required />
          </div>
          <div className={styles.inputField}>
            <label>Last Name *</label>
            <input type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className={styles.inputField}>
          <label>Email *</label>
          <input type="email" placeholder="you@company.com" required />
        </div>

        <div className={styles.inputField}>
          <label>Phone Number</label>
          <input type="tel" placeholder="+1 (111) 222 3344" />
        </div>

        <div className={styles.inputField}>
          <label>Message *</label>
          <textarea placeholder="Type your message..." required></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
      <CloseButton onClick={toggle} />
    </motion.div>
  );
};

export default ContactUsOverlay;
