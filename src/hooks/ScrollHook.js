import { useEffect, useRef } from "react";

// Custom hook for using Intersection Observer
const useIntersectionObserver = (callback, options = {}) => {
  const observer = useRef(null);

  // Initialize the Intersection Observer and clean it up
  useEffect(() => {
    observer.current = new IntersectionObserver(callback, options);

    // Cleanup function
    return () => {
      if (observer.current) {
        observer.current.disconnect(); // Disconnect the observer when unmounting
      }
    };
  }, [callback, options]);

  return observer.current;
};

export default useIntersectionObserver;
