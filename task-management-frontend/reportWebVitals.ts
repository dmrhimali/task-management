import webVitals from 'web-vitals';

const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;

const reportWebVitals = (onPerfEntry?: (metric: webVitals.Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
