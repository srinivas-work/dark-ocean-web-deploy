import { HTMLProps, useRef } from "react";
import { useCustomRouter } from "../../../../store/useCustomRouter";
import { useServiceOverlayStore } from "../../../../store/useOverlay";
import SocialMediaIconSet from "../../UI/SocialMediaIconSet/SocialMediaIconSet";
import { navLinks, serviceList } from "../../utils/data/dataHolder";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";
import styles from "./Footer.module.css";

const Footer: React.FC<HTMLProps<HTMLElement>> = ({ ...props }) => {
  const footerRef = useRef<HTMLElement>(null);
  const isMobileScreen = useIsPhoneScreen();
  const { toggle } = useServiceOverlayStore();
  const { setChosenRoute } = useCustomRouter();

  const mapClickHandler = () => {
    window.open("https://maps.app.goo.gl/4PE6kYdietdXar1X8", "_blank");
  };

  // const getPageLinks = (path: string, label: string) => {
  //   const currentPath = window.location.pathname;

  //   if (currentPath === "/") {
  //     return <a href={path}>{label}</a>;
  //   }

  //   return <Link to={path}>{label}</Link>;
  // };

  return (
    <footer
      ref={footerRef}
      {...props}
      className={`${styles.footer} ${props.className}`}
    >
      <div className={styles["footer-details-container"]}>
        <div className={styles.menu}>
          <h3 className={styles["footer-headings"]}>Quick Menu</h3>
          <ul className={styles["footer-clickable-list"]}>
            {navLinks.map((navItem, index) => (
              <li key={index} onClick={() => setChosenRoute(navItem.path)}>
                {navItem.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.services}>
          <h3 className={styles["footer-headings"]}>Product & Services</h3>
          <ul className={styles["footer-clickable-list"]}>
            {serviceList.map((service, index) => (
              <li key={index} onClick={toggle}>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contact}>
          <h3 className={styles["footer-headings"]}>Contact us</h3>
          <ul>
            <li>
              Office 9, Ground Floor, Building 2, Financial Square, Doha, Qatar
            </li>
            <li className={styles["footer-contact-details"]}>
              <strong>Tel:</strong> +974 4442 6003
            </li>
            <li className={styles["footer-contact-details"]}>
              <strong>Fax:</strong> +974 4441 7003
            </li>
            <li className={styles["footer-contact-details"]}>
              <strong>Email:</strong> commercial@darkocean.biz
            </li>
          </ul>
          <SocialMediaIconSet />
          <div
            className={styles["dark-ocean-map-link"]}
            onClick={mapClickHandler}
          >
            {/* <img src="/img/home/dark_ocean_map.jpg" alt="Dark Ocean" /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.24578823997!2d51.52397757516579!3d25.262315977669022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c52fd731a32f%3A0x861aab1db6d0cd36!2sDarkocean%20Qatar!5e0!3m2!1sen!2sin!4v1741713737838!5m2!1sen!2sin"
              width={isMobileScreen ? "100%" : "75%"}
              height="100"
              style={{ border: 0 }}
              allowFullScreen={undefined}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className={styles["certifications-logo-container"]}>
          <img
            src="/img/achilles-network-stamp-member.png"
            alt="Achilles Network Stamp Member"
          />

          <img src="/img/DO_Partner_Icons.jpg" />
        </div>
      </div>

      <div className={styles["footer-strip"]}>
        <div className={styles["border-line"]} />
        <ul className={styles.bottom}>
          <li>QATAR | KSA | UAE | UK | INDIA</li>
          <li>
            &copy; {new Date().getFullYear()} All rights reserved. Copyright by
            Darkocean
          </li>
          <li>GDPR | Privacy policy | Terms of service</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
