"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mobileView.module.css';

const SearchAndDisplayBooks = dynamic(() => import('../../SearchGoogleBookInput/SearchAndDisplayBooks'));
const BookStatisticsSvg = dynamic(() => import('../../SVGs/BookStatisticsSvg/BookStatisticsSvg'));

const MobileView = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {menuOpen ? (
        <div className={styles['hero-menu']}>
          <div className={styles['hero-menu__header']}>
            <Image
              src="/images/logo-purple.svg"
              alt="Verse Logo"
              width={40}
              height={40}
              className={styles['hero-menu__logo']}
            />
            <button onClick={toggleMenu} className={styles['hero-menu__close-button']}>
              <Image
                src="/images/icons/menu-toggle.svg"
                alt="Close Menu"
                width={24}
                height={24}
              />
            </button>
          </div>
          <ul className={styles['hero-menu__list']}>
            <li>
              <Link href="/auth/login" className={styles['hero-menu__link']} onClick={toggleMenu}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className={styles['hero-menu__link']} onClick={toggleMenu}>
                Books
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className={styles['hero-menu__link']} onClick={toggleMenu}>
                Popular
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className={styles['hero-menu__link']} onClick={toggleMenu}>
                Categories
              </Link>
            </li>
          </ul>
          <Link href="/auth/login" className={styles['hero-menu__login-button']} onClick={toggleMenu}>
            Log in
          </Link>
        </div>
      ) : (
        <div className={styles['hero']}>
          <div className={styles['hero__header']}>
            <Image
              src="/images/logo-purple.svg"
              alt="Verse Logo"
              width={40}
              height={40}
              className={styles['hero__logo']}
            />
            <button onClick={toggleMenu} className={styles['hero__menu-button']}>
              <div className={styles.navbar__hamburger} onClick={toggleMenu}>
                <div className={`${styles.navbar__bar} ${menuOpen ? styles['navbar__bar--active1'] : ''}`}></div>
                <div className={`${styles.navbar__bar} ${menuOpen ? styles['navbar__bar--active2'] : ''}`}></div>
                <div className={`${styles.navbar__bar} ${menuOpen ? styles['navbar__bar--active3'] : ''}`}></div>
              </div>
            </button>
          </div>
          <h1 className={styles['hero__title']}>Welcome<br />to<br />Verse</h1>
          <div className={styles['hero__search']}>
            <SearchAndDisplayBooks />
          </div>
          <div className={styles['hero__book-stats']}>
            <BookStatisticsSvg />
          </div>
          <Link href="/auth/register" className={styles['hero__button']}>
            Create Account
          </Link>
          <footer className={styles['hero__footer']}>
            <div className={styles['hero__footer-image']}>
              <Image
                src="/images/footer-waves.svg"
                alt="Footer Waves"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default MobileView;