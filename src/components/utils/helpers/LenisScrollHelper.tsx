import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; //Import ScrollTrigger
import Lenis from "lenis";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetHomepageScrollOffset } from "../../../../store/useHomepageScroll";

//Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Proper cleanup
    };
  }, []);

  return null;
};

//Reset Scroll Position on Route Change
const ScrollToTop = () => {
  const location = useLocation();
  const setScrollOffset = useSetHomepageScrollOffset();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(); //Refresh GSAP animations

    //Resetting Home Page Scroll
    if (location.pathname !== "/") {
      setScrollOffset(0);

      //Showing default scroll bar
      document.documentElement.style.overflowY = "visible";
      document.documentElement.style.overflowX = "hidden";
    }
  }, [location]);

  return null;
};

const LenisScrollHelper = () => {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
    </>
  );
};

export default LenisScrollHelper;
