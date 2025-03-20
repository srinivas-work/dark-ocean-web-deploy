import { useCallback, useEffect, useState } from "react";

const useIsPhoneScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${700}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setIsSmallScreen(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return isSmallScreen;
};

export default useIsPhoneScreen;
