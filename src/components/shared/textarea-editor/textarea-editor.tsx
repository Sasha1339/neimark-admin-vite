import {type FC, type TextareaHTMLAttributes, useRef} from 'react';
import styles from './textarea-editor.module.css';
import clsx from "clsx";

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextareaEditor: FC<Props> = ({
                                            label,
                                            disabled = false,
                                            ...props
                                          }) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.main}>
      {label && (
        <label className={styles.main_label}>{label}</label>
      )}
      <div
        className={clsx(styles.main_input_wrapper)}>
        <textarea
          ref={textareaRef}
          {...props}
          disabled={disabled}
          onKeyDown={() => {
          }}
          className={styles.main_input}
        />
      </div>
    </div>
  );
};
