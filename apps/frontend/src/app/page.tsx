import styles from './page.module.css';
import HeroSection from '../components/HeroSection/HeroSection';

const HomePage = () => {
  return (
    <div className={styles['hero-container']}>
      <HeroSection/>
    </div>
  );
};

export default HomePage;