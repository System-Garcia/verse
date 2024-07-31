import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <div className={styles['container']}>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__logoContainer}>
            <Image src="/images/logo-purple.svg" alt="Verse Logo" width={40} height={40} className={styles.header__logo} />
          </div>
          <nav className={styles.header__nav}>
            <ul className={styles.header__navList}>
              <li className={styles.header__navItem}>
                <Link href="/about" className={styles.header__navLink}>About us</Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/books" className={styles.header__navLink}>Books</Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/popular" className={styles.header__navLink}>Popular</Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/categories" className={styles.header__navLink}>Categories</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.header__actions}>
            <div className={styles.header__search}>
              <input type="text" placeholder="Type any book here" className={styles.header__searchInput} />
              <button className={styles.header__searchButton}>
                <Image src="/images/icons/search-icon.svg" alt="Search" width={16} height={16} />
              </button>
            </div>
            <Link href="/login" className={styles.header__login}>Log in</Link>
            <Link href="/register" className={styles.header__register}>Create Account</Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.hero}>
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <span className={styles.label}>Book of the Month</span>
                <h1 className={styles.title}>The Alchemist - Paulo Coelho</h1>
                <p className={styles.description}>
                  Paulo Coelho has captivated millions with his works, and "The Alchemist" is one of his most notable novels. With over 65 million copies sold and translated into 80 languages, this book inspires readers to follow their dreams and find their life's purpose.
                </p>
                <button className={styles.exploreButton}>Explore this book</button>
              </div>
              <div className={styles.heroSectionImage}>
                <div className={styles.PureImage}>
                  <Image src="/images/book-statistics.svg" alt="Book Statistics" width={600} height={400} />
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </main>

      <footer className={styles.Footer}>
            <div className={styles.JustImage}>
              <Image src="/images/footer-waves.svg" alt="Book Statistics" width={600} height={400} />
            </div>
          </footer>
    </div>
  );
};

export default HomePage;