const oceanScrollTarget = 0.43;

const getOceanNormalizedScrollOffset = (scrollOffset: number) => {
  let normalizedScroll =
    (scrollOffset - oceanScrollTarget) / (1 - oceanScrollTarget);

  // Ensure it stays between 0 and 1
  normalizedScroll = Math.max(0, Math.min(1, normalizedScroll));

  return normalizedScroll;
};

export { getOceanNormalizedScrollOffset, oceanScrollTarget };
