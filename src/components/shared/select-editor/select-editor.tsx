import React, {type FC, type InputHTMLAttributes} from 'react';
import styles from './select-editor.module.css';
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  options: SelectOption[];
}

export const SelectEditor: FC<Props> = ({
                                          value, onBlur, onChange,
                                          options,
                                          label,
                                          ...props
                                        }) => {

  const onChangeValue = (value: string) => {
    onChange?.(value);
  }

  return (
    <div className={styles.main}>
      {label && <div className={styles.main_label}>{label}</div>}
      <div className={styles.main_options}>
        {options.map((e) => (
          <div key={e.value}
               className={clsx(styles.main_option, {[styles.main_option_active]: e.value === value})} onClick={() => onChangeValue(e.value)}>{e.label}</div>
        ))}
      </div>
    </div>
  );
};
