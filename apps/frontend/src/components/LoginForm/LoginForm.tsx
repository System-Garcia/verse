'use client';

import { useState } from 'react';
import styles from './loginForm.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from '../../hooks/useForm';
import { Input } from '../Input/Input';
import { LoginResponse } from '../../app/interfaces/login-response.interface';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<LoginResponse>;
}

const formValidations = {
  email: {
    isValid: (value: string) => /\S+@\S+\.\S+/.test(value),
    errorMessage: 'Invalid email address',
  },
  password: {
    isValid: (value: string) => value.length >= 8,
    errorMessage: 'Password must be at least 8 characters',
  },
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { email, password, isFormValid, formValidation, onInputChange } =
    useForm({ email: '', password: '' }, formValidations);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setIsSubmitting(true);

    setFormSubmitted(false);
    const loginResponse = await onSubmit(email, password);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <div
        className={`${styles['login-form-input__container']} ${styles['login-form-input__container--email']}`}
      >
        <Input
          name="email"
          onChange={onInputChange}
          placeholder="Email"
          type="email"
          value={email}
          hasError={formValidation.emailValid && formSubmitted}
        />
      </div>

      <div
        className={`${styles['login-form-input__container']} ${styles['login-form-input__container--password']}`}
      >
        <Input
          name="password"
          onChange={onInputChange}
          placeholder="Password"
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          hasError={formValidation.passwordValid && formSubmitted}
        />

        <Image
          src={
            passwordVisible
              ? '/images/icons/eye-off.svg'
              : '/images/icons/eye-on.svg'
          }
          alt={passwordVisible ? 'Hide password' : 'Show password'}
          width={24}
          height={24}
          onClick={togglePasswordVisibility}
          className={styles['login-form__password-icon']}
          id="togglePassword"
        />
      </div>

      <button
        type="submit"
        className={styles['login-form__button']}
        disabled={isSubmitting ? true : false}
      >
        Log In
      </button>

      <p className={styles['login-form__register']}>
        Don’t have an account yet?{' '}
        <Link
          className={styles['login-form__register-link']}
          href={'/auth/register'}
        >
          Sign up here
        </Link>
      </p>
    </form>
  );
};
