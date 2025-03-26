import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { lazy, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import Footer from "../../components/NormalComponents/Footer/Footer";
import AuvAnimated from "../../components/NormalComponents/HomePageComponents/AuvAnimated/AuvAnimated";
import EarthCoreScale from "../../components/NormalComponents/HomePageComponents/EarthCoreScale/EarthCoreScale";
import HomePageTextArranger from "../../components/NormalComponents/HomePageComponents/HomePageTextArranger/HomePageTextArranger";
import BlinkingSpaceDot from "../../components/UI/BlinkingSpaceDot/BlinkingSpaceDot";
import CustomLoader from "../../components/UI/CustomLoader/CustomLoader";
import ScrollDownText from "../../components/UI/ScrollDownText/ScrollDownText";
import AdaptivePixelRatio from "../../components/utils/helpers/AdaptivePixelRatio";
import CustomDreiScrollHelper from "../../components/utils/helpers/CustomDreiScrollHelper";
import useIsPhoneScreen from "../../components/utils/hooks/useIsPhoneScreen";

const HomePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  const isPhoneScreen = useIsPhoneScreen();

  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    //Hiding default scroll bar
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "hidden";
    }

    const handleVisibilityChange = () =>
      setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const Space = lazy(
    () =>
      import(
        "../../components/ThreeDComponents/SpaceEarthScene/SpaceEarthScene"
      )
  );
  const Ocean = lazy(
    () => import("../../components/ThreeDComponents/OceanScene/OceanScene")
  );
  const Underwater = lazy(
    () =>
      import(
        "../../components/ThreeDComponents/UnderWaterScene/UnderwaterScene"
      )
  );

  return (
    <main>
      <BlinkingSpaceDot />
      <HomePageTextArranger />
      <EarthCoreScale />
      <AuvAnimated />
      <ScrollDownText />
      <CustomLoader />
      <Canvas
        key={location.pathname}
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0, //"-66.5vh"
          left: 0,
          right: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          backgroundColor: "var(--primary-dark)",
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true, // Enable anti-aliasing
          alpha: true, // Optional: Make the canvas background transparent
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NeutralToneMapping,
          //logarithmicDepthBuffer: true,
        }}
        frameloop={frameloop}
        performance={{
          current: 1,
          min: 0.1,
          max: 1,
          debounce: 200,
        }}
        // camera={{ fov: 100, near: 1000, far: 3500000 }}
      >
        {/* <OrbitControls /> */}
        {/* <Perf position="top-left" /> */}
        {/* <RigAnimation /> */}
        <AdaptivePixelRatio />
        <ScrollControls pages={8} distance={isPhoneScreen ? 1.7 : 2}>
          <CustomDreiScrollHelper />
          <Scroll html>
            <div style={{ height: isPhoneScreen ? "660vh" : "745vh" }} />
            <Footer />
          </Scroll>
          <Space />
          <Ocean />
          <Underwater />
        </ScrollControls>
      </Canvas>
    </main>
  );
};

export default HomePage;
