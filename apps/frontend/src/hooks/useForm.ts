import { useEffect, useMemo, useState } from "react";

type FormState<T> = T;

type FormValidation<T> = {
  [K in keyof T]: {
    isValid: (value: T[K]) => boolean;
    errorMessage: string;
  };
};

export const useForm = <T extends Record<string, any>>(
  initialForm: T,
  formValidations: FormValidation<T>
) => {
  const [formState, setFormState] = useState<FormState<T>>(initialForm);
  const [formValidation, setFormValidation] = useState<Record<string, any>>({});

  // Initialize form validations
  useEffect(() => {
    const initialValidations: Record<string, any> = {};
    for (const key of Object.keys(formValidations)) {
      const { isValid, errorMessage } = formValidations[key];
      initialValidations[`${key}Valid`] = isValid(initialForm[key]) ? null : errorMessage;
    }
    setFormValidation(initialValidations);
  }, []); // Run only once on initial mount

  // Memoized computed property for form validity
  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null);
  }, [formValidation]);

  // Event handlers
  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
    validateField(name, value);
  };

  const onTextAreaChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
    validateField(name, value);
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const validateField = (name: string, value: any) => {
    const { isValid, errorMessage } = formValidations[name];
    setFormValidation({
      ...formValidation,
      [`${name}Valid`]: isValid(value) ? null : errorMessage
    });
  };

  return {
    ...formState,
    formValidation,
    formState,
    isFormValid,
    onInputChange,
    onTextAreaChange,
    onResetForm,
  };
};