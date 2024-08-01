import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import MobileView from '../components/HeroSection/MobileView';
import Features from '../components/FeatureList/FeatureList';
import InsertBookImages from '../components/SVGs/BookStatisticsSvg/InsertBookImages';
import BookStatisticsSvg from '../components/SVGs/BookStatisticsSvg/BookStatisticsSvg';

const HomePage = () => {
  return (
    <>
      <div className={styles['mobile-view']}>
        <MobileView />
      </div>
      <div className={styles['home-container']}>
        <header className={styles['home-header']}>
          <div className={styles['home-header__container']}>
            <div className={styles['home-header__logo-container']}>
              <Image 
                src="/images/logo-purple.svg" 
                alt="Verse Logo" 
                width={40} 
                height={40} 
                className={styles['home-header__logo']} 
                priority
              />
            </div>
            <nav className={styles['home-header__nav']}>
              <ul className={styles['home-header__nav-list']}>
                <li className={styles['home-header__nav-item']}>
                  <Link href="/auth/login" className={styles['home-header__nav-link']} aria-label="About us page" prefetch>
                    About us
                  </Link>
                </li>
                <li className={styles['home-header__nav-item']}>
                  <Link href="/auth/login" className={styles['home-header__nav-link']} aria-label="Books page" prefetch>
                    Books
                  </Link>
                </li>
                <li className={styles['home-header__nav-item']}>
                  <Link href="/auth/login" className={styles['home-header__nav-link']} aria-label="Popular books page" prefetch>
                    Popular
                  </Link>
                </li>
                <li className={styles['home-header__nav-item']}>
                  <Link href="/auth/login" className={styles['home-header__nav-link']} aria-label="Categories page" prefetch>
                    Categories
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={styles['home-header__actions']}>
              <div className={styles['home-header__search']}>
                <input 
                  type="text" 
                  placeholder="Type any book here" 
                  className={styles['home-header__search-input']} 
                  aria-label="Search books"
                />
                <button className={styles['home-header__search-button']} aria-label="Search button">
                  <Image 
                    src="/images/icons/search-icon.svg" 
                    alt="Search" 
                    width={16} 
                    height={16} 
                  />
                </button>
              </div>
              <Link href="/auth/login" className={styles['home-header__login']} aria-label="Log in page">
                Log in
              </Link>
              <Link href="/register" className={styles['home-header__register']} aria-label="Register page">
                Create Account
              </Link>
            </div>
          </div>
        </header>

        <main className={styles['home-main']}>
          <div className={styles['home-main__content']}>
            <section className={styles['home-hero']}>
              <div className={styles['home-hero__container']}>
                <div className={styles['home-hero__content']}>
                  <span className={styles['home-hero__label']}>
                    Book of the Month
                  </span>
                  <h1 className={styles['home-hero__title']}>
                    The Alchemist - Paulo Coelho
                  </h1>
                  <p className={styles['home-hero__description']}>
                    Paulo Coelho has captivated millions with his works, and "The Alchemist" 
                    is one of his most notable novels. With over 65 million copies sold and 
                    translated into 80 languages, this book inspires readers to follow their 
                    dreams and find their life's purpose.
                  </p>
                  <button className={styles['home-hero__explore-button']}>
                    Explore this book
                  </button>
                  <Features />
                </div>
                <div className={styles['home-hero__image-container']}>
                  <div className={styles['home-hero__image']}>
                    <BookStatisticsSvg />
                    <InsertBookImages/>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className={styles['home-footer']}>
          <div className={styles['home-footer__image-container']}>
            <Image 
              src="/images/footer-waves.svg" 
              alt="Footer Waves" 
              width={600} 
              height={400} 
              layout="responsive"
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;