import { useProgress, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSetHomepageScrollOffset } from "../../../../store/useHomepageScroll";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useCustomLoaderStore } from "../../../../store/useCustomLoader";

const CustomDreiScrollHelper = () => {
  const scroll = useScroll();
  const setScrollOffset = useSetHomepageScrollOffset();

  const { progress } = useProgress();
  const { setProgress } = useCustomLoaderStore();

  const latestProgress = useRef(0); // Store the latest stable progress
  const fakeProgress = useRef(0); // Track artificial progress

  const debouncedLog = debounce((newProgress) => {
    if (newProgress >= latestProgress.current) {
      latestProgress.current = newProgress;
      fakeProgress.current = newProgress; // Keep fake progress in sync
      setProgress(newProgress);
    }
  }, 200);

  useEffect(() => {
    if (progress < latestProgress.current) return; // Prevent regression
    debouncedLog(progress);
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestProgress.current < 100) {
        fakeProgress.current = Math.min(fakeProgress.current + 2, 100);
        setProgress(fakeProgress.current);
      }
    }, 500); // Increase fake progress every 500ms

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    setScrollOffset(scroll.offset);
  });

  return null;
};

export default CustomDreiScrollHelper;
