import Image from 'next/image';
import styles from './MobileView.module.css';
import Link from 'next/link';

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
      <Link href="/auth/register" className={styles['mobile-view__button']}>
        Create Account
      </Link>      <Link href="/auth/login" className={styles['mobile-view__button--outline']}>
        Log In
      </Link>
    </div>
  );
};

export default MobileView;