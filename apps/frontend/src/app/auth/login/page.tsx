import Image from 'next/image';
import styles from './page.module.css';
import { LoginForm } from 'apps/frontend/src/components/LoginForm/LoginForm';
import { login } from './action';

export default function LoginPage() {
  return (
    <div className={`${styles.login} container`}>
      <div className={styles['login__logo-container']}>
        <Image
          src="/images/logo-purple.svg"
          alt="Logo"
          width={200}
          height={185}
          priority
        />
      </div>

      <LoginForm onSubmit={login} />
    </div>
  );
}
