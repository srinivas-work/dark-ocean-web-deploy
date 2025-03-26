import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";
import styles from "./TopNav.module.css";
import { useContactOverlayStore } from "../../../../store/useOverlay";
import { navLinks } from "../../utils/data/dataHolder";

const NAV_ANIMATION = {
  closed: {
    width: "100vw",
    transform: "translate3d(0,-200%,0)",
  },
  open: {
    width: "100vw",
    transform: "translate3d(0,0,0)",
  },
};

const TopNav: React.FC<{ onHamburgerOpen: (isOpen: boolean) => void }> = ({
  onHamburgerOpen,
}) => {
  const navRef = useRef<HTMLElement | null>(null);
  const { toggle } = useContactOverlayStore();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isServicePage = location.pathname === "/services";
  const isPhoneScreen = useIsPhoneScreen();
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => {
      onHamburgerOpen(!prev);
      return !prev;
    });
  };

  return (
    <>
      {isPhoneScreen && (
        <div
          style={{
            marginLeft: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "end",
            zIndex: 10000,
          }}
        >
          <Hamburger
            toggled={isOpen}
            direction="right"
            size={28}
            duration={0.7}
            rounded
            onToggle={handleHamburgerClick}
            color={
              isOpen || isHomePage || isServicePage
                ? "white"
                : "var(--primary-blue)"
            }
          />
        </div>
      )}

      <motion.nav
        className={styles.Nav}
        initial={isPhoneScreen ? NAV_ANIMATION.closed : {}}
        animate={
          isOpen
            ? NAV_ANIMATION.open
            : isPhoneScreen
            ? NAV_ANIMATION.closed
            : {}
        }
        transition={{ duration: 0.7 }}
        onClick={() => setIsOpen(false)}
        ref={navRef}
      >
        <ul style={{ color: isHomePage ? "white" : "var(--primary-blue)" }}>
          {navLinks.map(
            ({ path, label }, index) =>
              label !== "Career" && (
                <li
                  key={index}
                  onClick={label === "Contact" ? toggle : undefined}
                >
                  {label === "Contact" ? label : <Link to={path}>{label}</Link>}
                </li>
              )
          )}
          <li>
            <a
              href="https://www.linkedin.com/company/darkoceanmarine/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Career
            </a>
          </li>
        </ul>
      </motion.nav>
    </>
  );
};

export default TopNav;
