import dynamic from 'next/dynamic';
import styles from './page.module.css';

const DesktopView = dynamic(() => import('../components/HeroSection/Desktop/DesktopView'), { ssr: false });
const MobileView = dynamic(() => import('../components/HeroSection/Mobile/MobileView'), { ssr: false });

const HomePage = () => {
  return (
    <div className={styles['hero-container']}>
      <MobileView />
      <DesktopView />
    </div>
  );
};

export default HomePage;