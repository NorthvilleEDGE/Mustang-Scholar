import { useState, useEffect } from 'react';

const MobileWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      setIsVisible(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mobile-warning">
      <button className="mobile-warning-close" onClick={() => setIsVisible(false)}>×</button>
      <p>This site is not yet optimized for mobile viewing.</p>
      <p>Please rotate your device to landscape mode or use a computer for the best experience.</p>
    </div>
  );
};

export default MobileWarning;
