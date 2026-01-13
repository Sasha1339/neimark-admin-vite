import {type FC, useEffect, useRef, useState} from 'react';
import styles from './select-panel-editor.module.css';
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";

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

export const SelectPanelEditor: FC<Props> = ({
                                               value, onBlur, onChange,
                                               options,
                                               label,
                                               ...props
                                             }) => {

  const [open, isOpen] = useState(false);
  const element = useRef<HTMLDivElement>(null)


  const onChangeValue = (value: string) => {
    onChange?.(value);
  }

  useEffect(() => {

    const handleDocumentClick = (e: MouseEvent) => {
      // Проверяем, что клик был ВНЕ элемента иконки
      if (element.current && !element.current.contains(e.target as Node)) {
        isOpen(false)
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.main}>
      {label && <div className={styles.main_label}>{label}</div>}
      <div ref={element} className={styles.main_wrapper} onClick={() => isOpen(!open)}>
        <span
          className={styles.main_value}>{value ? options.find((e) => e.value === value)?.label ?? 'Ошибка' : 'Выберите значение из списка'}
        </span>
        <IconSvg name={'arrow'}
                 rotate={open ? 270 : 90}
                 size={20}/>
      </div>
      {open && <div className={styles.main_options}>
        {options.map((e, i) => (
          <span className={styles.main_option} key={i} onClick={() => onChangeValue(e.value)}>{e.label}</span>
        ))}
      </div>}
    </div>
  );
};
