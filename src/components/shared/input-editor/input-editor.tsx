import {type FC, type InputHTMLAttributes} from 'react';
import styles from './input-editor.module.css';
import clsx from "clsx";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  error?: string;
  isInvalid?: boolean;
}

export const InputEditor: FC<Props> = ({
                                         label,
                                         error,
                                         isInvalid = false,
                                         disabled = false,
                                         ...props
                                       }) => {

  return (
    <div className={styles.main}>
      {label && (
        <label className={styles.main_label}>{label}</label>
      )}
      <div
        className={clsx(styles.main_input_wrapper, {[styles.main_input_wrapper_invalid]: isInvalid})}>
        <input
          {...props}
          disabled={disabled}
          onKeyDown={() => {
          }}
          className={styles.main_input}
        />
      </div>
      {error && <div className={styles.main_error}>{error}</div>}
    </div>
  );
};
