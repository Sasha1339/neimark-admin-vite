import {type FC, type InputHTMLAttributes} from 'react';
import styles from './input-editor.module.css';
import clsx from "clsx";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'password';
  disabled?: boolean;
  error?: string;
  isInvalid?: boolean;
  mainClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

export const InputEditor: FC<Props> = ({
                                         label,
                                         error,
                                         mainClassName,
                                         labelClassName,
                                         wrapperClassName,
                                         inputClassName,
                                         isInvalid = false,
                                         type = 'text',
                                         disabled = false,
                                         ...props
                                       }) => {

  return (
    <div className={clsx(styles.main, mainClassName)}>
      {label && (
        <label className={clsx(styles.main_label, labelClassName)}>{label}</label>
      )}
      <div
        className={clsx(styles.main_input_wrapper, {[styles.main_input_wrapper_invalid]: isInvalid}, wrapperClassName)}>
        <input
          {...props}
          disabled={disabled}
          type={type}
          onKeyDown={() => {
          }}
          className={clsx(styles.main_input, inputClassName)}
        />
      </div>
      {error && <div className={styles.main_error}>{error}</div>}
    </div>
  );
};
