import Image from 'next/image';
import Link from 'next/link';
import styles from './desktopView.module.css';
import Features from '../../FeatureList/FeatureList';
import dynamic from 'next/dynamic';

const SearchAndDisplayBooks = dynamic(() => import('../../SearchGoogleBookInput/SearchAndDisplayBooks'));
const BookStatisticsSvg = dynamic(() => import('../../SVGs/BookStatisticsSvg/BookStatisticsSvg'));

const DesktopView = () => {
  return (
    <>
      <header className={styles['hero-header']}>
        <div className={styles['hero-header__container']}>
          <div className={styles['hero-header__logo-container']}>
            <Image
              src="/images/logo-purple.svg"
              alt="Verse Logo"
              width={40}
              height={40}
              className={styles['hero-header__logo']}
              priority
            />
          </div>
          <nav className={styles['hero-header__nav']}>
            <ul className={styles['hero-header__nav-list']}>
              <li className={styles['hero-header__nav-item']}>
                <Link href="/auth/login" className={styles['hero-header__nav-link']} aria-label="About us page" prefetch>
                  About us
                </Link>
              </li>
              <li className={styles['hero-header__nav-item']}>
                <Link href="/auth/login" className={styles['hero-header__nav-link']} aria-label="Books page" prefetch>
                  Books
                </Link>
              </li>
              <li className={styles['hero-header__nav-item']}>
                <Link href="/auth/login" className={styles['hero-header__nav-link']} aria-label="Popular books page" prefetch>
                  Popular
                </Link>
              </li>
              <li className={styles['hero-header__nav-item']}>
                <Link href="/auth/login" className={styles['hero-header__nav-link']} aria-label="Categories page" prefetch>
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles['hero-header__actions']}>
            <div className={styles['hero-header__search']}>
              <SearchAndDisplayBooks />
            </div>
            <Link href="/auth/login" className={styles['hero-header__login']} aria-label="Log in page">
              Log in
            </Link>
            <Link href="/auth/register" className={styles['hero-header__register']} aria-label="Register page">
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main className={styles['hero-main']}>
        <div className={styles['hero-main__content']}>
          <section className={styles['hero-hero']}>
            <div className={styles['hero-hero__container']}>
              <div className={styles['hero-hero__content']}>
                <span className={styles['hero-hero__label']}>
                  Book of the Month
                </span>
                <h1 className={styles['hero-hero__title']}>
                  The Alchemist - Paulo Coelho
                </h1>
                <p className={styles['hero-hero__description']}>
                  Paulo Coelho has captivated millions with his works, and "The Alchemist"
                  is one of his most notable novels. With over 65 million copies sold and
                  translated into 80 languages, this book inspires readers to follow their
                  dreams and find their life's purpose.
                </p>
                <Link href="/auth/login" className={styles['hero-hero__explore-button']}>
                  Explore this book
                </Link>
                <Features />
              </div>
              <div className={styles['hero-hero__image-container']}>
                <div className={styles['hero-hero__image']}>
                  <BookStatisticsSvg />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles['hero-footer']}>
        <div className={styles['hero-footer__image-container']}>
          <Image
            src="/images/footer-waves.svg"
            alt="Footer Waves"
            width={600}
            height={400}
          />
        </div>
      </footer>
    </>
  );
};

export default DesktopView;