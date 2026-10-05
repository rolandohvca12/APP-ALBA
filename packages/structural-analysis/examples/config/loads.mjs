// Area loads use configured force/length2.
export const loads = {
  liveLoadPerArea: 0.25,
  seismicLiveLoadFactor: 0.25,
  seismic: {
    zoneFactor: 0.25,
    useFactor: 1,
    soilFactor: 1,
    amplificationFactor: 2.5,
    reductionFactor: 6,
  },
};
