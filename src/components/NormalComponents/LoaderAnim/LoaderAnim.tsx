import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./LoaderAnim.module.css";

const LoaderAnim = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const waveLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current && waveLogoRef.current) {
      //screen opacity animation
      const tl = gsap.timeline();
      tl.to(loaderRef.current, {
        //scale: 20.5,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power1.out",
      }).to(
        loaderRef.current,
        {
          //y: "-100vh",
          visibility: "hidden",
        },
        "+=0.001"
      );

      //Logo moving animation
      gsap.to(waveLogoRef.current, {
        x: "-40vw",
        y: "-50vh",
        scale: 0.5,
        duration: 1,
        delay: 1.5,
        ease: "power1.out",
      });

      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <div ref={loaderRef} className={styles["loader-container"]}>
      <div className={styles["wave-fill"]} ref={waveLogoRef}>
        <div className={styles.water}>
          <span className={styles.wave}></span>
          <span className={styles["deep-water"]}></span>
        </div>
      </div>
      {/* <div
        ref={animationContinerRef}
        style={{ width: "100vw", height: "100vh" }}
      /> */}
    </div>
  );
};

export default LoaderAnim;

//Loading the logo animation
// if (animationContinerRef.current) {
//   import("lottie-web").then((Lottie) => {
//     //@ts-ignore
//     Lottie.loadAnimation({
//       container: animationContinerRef.current,
//       renderer: "svg",
//       loop: false,
//       autoplay: true,
//       animationData: darkOceanLogoAnimation,
//       rendererSettings: {
//         scaleMode: "noScale",
//         clearCanvas: false,
//         progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
//         hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
//       },
//     });
//   });
// }
