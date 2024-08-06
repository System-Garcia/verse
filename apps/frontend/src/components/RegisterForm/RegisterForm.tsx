'use client';

import Image from 'next/image';
import { useForm } from '../../hooks/useForm';
import { Input } from '../Input/Input';
import { useEffect, useState } from 'react';
import styles from './registerForm.module.css';
import { Alert, AlertProps } from '../Alert/Alert';
import { RegisterResponse } from '../../app/interfaces/register-response.interface';
import Link from 'next/link';

interface RegisterFormProps {
  onSubmit: (
    email: string,
    password: string,
    name: string
  ) => Promise<RegisterResponse>;
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
  name: {
    isValid: (value: string) => value.length >= 3,
    errorMessage: 'Name must be at least 3 characters',
  },
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Is valid confirm password state
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    setIsValidConfirmPassword(password === confirmPassword);
  }, [confirmPassword, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid || !isValidConfirmPassword) return;

    setIsSubmitting(true);
    const registerResponse = await onSubmit(email, password, name);

    switch (registerResponse.statusCode) {
      case 200:
        setShowAlert(true);
        setAlertProps({ message: 'Registration successful', type: 'success' });
        break;
      case 409:
        setShowAlert(true);
        setAlertProps({
          message: 'Email already in use. Please try again.',
          type: 'error',
        });
        break;
      default:
        setShowAlert(true);
        setAlertProps({
          message: 'An error occurred. Please try again.',
          type: 'error',
        });
        break;
    }

    setIsSubmitting(false);
  };

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [{ message, type }, setAlertProps] = useState<AlertProps>({
    message: '',
    type: 'success',
  });

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <Alert message={message} type={type} onClose={handleCloseAlert} />
      )}

      <form onSubmit={handleSubmit} className={styles['register-form']}>
        <div className={styles['register-form__input-container']}>
          <Input
            name="name"
            placeholder="Name"
            type="text"
            onChange={onInputChange}
            value={name}
            hasError={!!formValidation.nameValid && formSubmitted}
          />

          {!formValidation.nameValid === null && (
            <Image
              src={'/images/icons/checked.svg'}
              alt="Name is valid"
              width={24}
              height={24}
              className={styles['register-form__icon']}
            />
          )}

          {formValidation.nameValid && formSubmitted && (
            <p className={styles['register-form__error-message']}>
              {formValidation.nameValid}
            </p>
          )}
        </div>

        <div className={styles['register-form__input-container']}>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={onInputChange}
            value={email}
            hasError={!!formValidation.emailValid && formSubmitted}
          />

          {!formValidation.emailValid === null && (
            <Image
              src={'/images/icons/checked.svg'}
              alt="Email is valid"
              width={24}
              height={24}
              className={styles['register-form__icon']}
            />
          )}

          {formValidation.emailValid && formSubmitted && (
            <p className={styles['register-form__error-message']}>
              {formValidation.emailValid}
            </p>
          )}
        </div>

        <div className={styles['register-form__input-container']}>
          <Input
            name="password"
            placeholder="Password"
            type={passwordVisible ? 'text' : 'password'}
            onChange={onInputChange}
            value={password}
            hasError={!!formValidation.passwordValid && formSubmitted}
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
          />

          {formValidation.passwordValid && formSubmitted && (
            <p className={styles['register-form__error-message']}>
              {formValidation.passwordValid}
            </p>
          )}
        </div>

        <div className={styles['register-form__input-container']}>
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type={confirmPasswordVisible ? 'text' : 'password'}
            onChange={onConfirmPasswordChange}
            value={confirmPassword}
            hasError={
              (!isValidConfirmPassword && formSubmitted) ||
              (confirmPassword === '' && formSubmitted)
            }
          />

          <Image
            src={
              confirmPasswordVisible
                ? '/images/icons/eye-off.svg'
                : '/images/icons/eye-on.svg'
            }
            alt={confirmPasswordVisible ? 'Hide password' : 'Show password'}
            width={24}
            height={24}
            onClick={toggleConfirmPasswordVisibility}
            className={styles['register-form__password-icon']}
          />

          {!isValidConfirmPassword && formSubmitted && (
            <p className={styles['register-form__error-message']}>
              Passwords do not match
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles['register-form__button']}
          disabled={isSubmitting ? true : false}
        >
          Create Account
        </button>

        <p className={styles['register-form__login']}>
          Already have an account?{' '}
          <Link
            className={styles['register-form__login-link']}
            href={'/auth/login'}
          >
            Log in here
          </Link>
        </p>
      </form>
    </>
  );
}
