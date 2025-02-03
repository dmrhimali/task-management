import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';
import { Metric } from 'web-vitals';  // Import Metric directly

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);  // Get CLS (Cumulative Layout Shift)
    onFID(onPerfEntry);  // Get FID (First Input Delay)
    onFCP(onPerfEntry);  // Get FCP (First Contentful Paint)
    onLCP(onPerfEntry);  // Get LCP (Largest Contentful Paint)
    onTTFB(onPerfEntry); // Get TTFB (Time to First Byte)
  }
};

export default reportWebVitals;