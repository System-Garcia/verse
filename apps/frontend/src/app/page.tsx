import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

const WelcomePage = () => {
  return (
    <div className={styles['welcome__outerContainer']}>
      <div className={styles['welcome__innerContainer']}>
        <div className={styles['welcome__backcover']}>
          <h1 className={styles['welcome__title']}>Descubre VERSE</h1>
          <p className={styles['welcome__subtitle']}>Tu próximo libro favorito te espera</p>
          <p className={styles['welcome__description']}>En VERSE, te ofrecemos recomendaciones personalizadas de libros basadas en tus gustos y hábitos de lectura. Únete a una comunidad activa y sigue tu progreso de lectura fácilmente.</p>
          <ul className={styles['welcome__benefits']}>
            <li className={styles['welcome__benefit']}>📚 Recomendaciones Personalizadas: Libros elegidos especialmente para ti.</li>
            <li className={styles['welcome__benefit']}>👥 Comunidad Activa: Participa en clubes de lectura y foros de discusión.</li>
            <li className={styles['welcome__benefit']}>📈 Seguimiento del Progreso: Lleva un registro de tus metas y logros.</li>
          </ul>
        </div>
        <div className={styles['welcome__spine']}>
          <Image src="/images/logo-white.svg" alt="Logo" width={50} height={50} className={styles['welcome__logo_spine']} />
        </div>
        <div className={styles['welcome__cover']}>
          <Image src="/images/logo-white.svg" alt="Logo" width={100} height={100} className={styles['welcome__logo_cover']} />
          <h1 className={styles['welcome__title']}>Welcome to VERSE</h1>
          <p className={styles['welcome__subtitle']}>Read without limits</p>
          <Link href="/auth/register" className={`${styles['welcome__button']} ${styles['welcome__button--create']}`}>
            Create Account
          </Link>
          <Link href="/auth/login" className={`${styles['welcome__button']} ${styles['welcome__button--guest']}`}>
            Log In as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;