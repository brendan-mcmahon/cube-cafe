import { useState, useEffect } from 'react';

const mobileWidth = 900;
const mobileHeight = 400;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileWidth && window.innerHeight <= mobileHeight);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= mobileWidth && window.innerHeight <= mobileHeight);

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

