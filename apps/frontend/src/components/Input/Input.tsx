import styles from './input.module.css';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  name: string;
  hasError?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Input = ({ value, onChange, placeholder, type, name, hasError = false }: InputProps) => {
  return (
    <input
      name={name}
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ borderColor: hasError ? '#B71C1C' : '' }}
    />
  );
};