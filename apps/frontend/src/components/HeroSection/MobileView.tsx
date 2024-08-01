import Image from 'next/image';
import styles from './MobileView.module.css';

const MobileView = () => {
  return (
    <div className={styles['mobile-view']}>
      <Image 
        src="/images/logo-white.svg" 
        alt="Verse Logo" 
        width={150} 
        height={150} 
        className={styles['mobile-view__logo']} 
      />
      <h1 className={styles['mobile-view__title']}>Welcome</h1>
      <p className={styles['mobile-view__subtitle']}>Read without limits</p>
      <button className={styles['mobile-view__button']}>Create Account</button>
      <button className={styles['mobile-view__button--outline']}>Log In</button>
    </div>
  );
};

export default MobileView;