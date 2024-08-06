'use client';

import Image from 'next/image';
import { useForm } from '../../hooks/useForm';
import { Input } from '../Input/Input';
import { useState } from 'react';
import styles from './registerForm.module.css';

const formValidations = {
  email: {
    isValid: (value: string) => /\S+@\S+\.\S+/.test(value),
    errorMessage: 'Invalid email address',
  },
  password: {
    isValid: (value: string) => value.length >= 8,
    errorMessage: 'Password must be at least 8 characters',
  },
  name: {
    isValid: (value: string) => value.length >= 3,
    errorMessage: 'Name must be at least 3 characters',
  },
};

export default function RegisterForm() {
  // Form state
  const { onInputChange, formValidation, isFormValid, email, password, name } =
    useForm(
      {
        email: '',
        password: '',
        name: '',
      },
      formValidations
    );

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form className={styles['register-form']}>
        
        <div className={styles['register-form__input-container']}>
        <Input
        name="email"
        placeholder="Email"
        type="email"
        onChange={onInputChange}
        value={email}
      />
        </div>

      <div className={styles['register-form__input-container']}>
        <Input
          name="password"
          placeholder="Password"
          type={passwordVisible ? 'text' : 'password'}
          onChange={onInputChange}
          value={password}
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
          className={styles['register-form__password-icon']}
          id="togglePassword"
        />
      </div>

      <Input
        name="name"
        placeholder="Name"
        type="text"
        onChange={onInputChange}
        value={name}
      />
    </form>
  );
}
