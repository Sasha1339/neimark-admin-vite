import {type FC, forwardRef} from 'react';
import styles from './date-editor.module.css';
import clsx from "clsx";
import {ru} from 'date-fns/locale'
import 'styles/date-style.css';
import DatePicker from "react-datepicker";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  isInvalid?: boolean;
}

export const DateEditor: FC<Props> = ({
                                        value,
                                        label,
                                        error,
                                        isInvalid = false,
                                        description,
                                        onChange,
                                        disabled = false,
                                        ...props
                                      }) => {

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange?.(date.toISOString());
    }
  };


  return (
    <div className={styles.main}>
      <div>
        {label && (
          <label className={styles.main_label}>{label}</label>
        )}
        {description && (
          <p className={styles.main_sub_label}>{description}</p>
        )}
      </div>

      <div
        className={clsx(styles.main_input_wrapper, {[styles.main_input_wrapper_invalid]: isInvalid})}>
        <DatePicker
          locale={ru}
          selected={value && value !== '' ? new Date(value) : null}
          onChange={handleDateChange}
          selectsStart
          isClearable={false}
          monthsShown={1}
          minDate={new Date()}
          dateFormat="dd.MM.yyyy"
          popperPlacement="bottom-start"
          showPopperArrow={false}
          previousMonthButtonLabel="< Предыдущий"
          nextMonthButtonLabel="Следующий >"
          customInput={<CustomInputStart/>}
        />
      </div>
      {error && <div className={styles.main_error}>{error}</div>}
    </div>
  );
};

export const CustomInputStart = forwardRef<HTMLButtonElement, any>(({value, onClick, title}, ref) => (
  <button className={styles.custom_date_input} onClick={onClick} ref={ref}>
    {value || 'Выбрать дату'}
    <IconSvg name={'calendar'} color={'main-active'} />
  </button>
));
