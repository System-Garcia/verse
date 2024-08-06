import Image from 'next/image';
import styles from './page.module.css';
import RegisterForm from 'apps/frontend/src/components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div className={`${styles['register']} container`}>
      <div className={styles['register__logo']}>
        <Image
          src="/images/logo-purple.svg"
          alt="Register"
          height={100}
          width={100}
          priority
        />
      </div>

      <RegisterForm />
    </div>
  );
}
