import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Header.module.css";
import { useCustomRouter } from "../../../../store/useCustomRouter";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [addBackground, setAddBackground] = useState(false);

  const { chosenRoute } = useCustomRouter();
  const navigate = useNavigate();

  //Using custom navigation to avoid homepage navigation error
  useEffect(() => {
    navigate(chosenRoute);
  }, [chosenRoute]);

  const getImgLink = (pageName: string) => {
    if (pageName.startsWith("/press-release")) {
      return "dark-ocean-logo-blue";
    }

    switch (pageName) {
      case "/about":
        return "dark-ocean-logo-blue";
      default:
        return "dark-ocean-logo";
    }
  };

  return (
    <header
      className={styles.Header}
      style={{
        borderColor: isHomePage ? "transparent" : "var(--primary-blue)",
        position: addBackground ? "absolute" : "fixed",
      }}
    >
      <Link to="/">
        <img
          src={`/img/${getImgLink(location.pathname)}.svg`}
          alt="DarkOcean"
        />
      </Link>
      <TopNav onHamburgerOpen={(isOpen) => setAddBackground(isOpen)} />
    </header>
  );
};

export default Header;
