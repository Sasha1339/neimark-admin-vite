import {type FC, type InputHTMLAttributes, useMemo} from 'react';
import styles from './file-editor.module.css';
import {v4 as uuidv4} from 'uuid';
import clsx from "clsx";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import {withUrlImages} from "@/shared/functions.ts";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  files?: FileList | null;
  imagesId?: string[];
  disabled?: boolean;
  error?: string;
}

export const FileEditor: FC<Props> = ({
                                        label,
                                        description,
                                        files,
                                        imagesId,
                                        error,
                                        disabled = false,
                                        ...props
                                      }) => {

  const id = useMemo(() => (uuidv4()), []);

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

      <div className={styles.main_wrapper}>
        <input
          {...props}
          id={id}
          type={'file'}
          disabled={disabled}
          className={styles.main_input}
        />
        {<label
          htmlFor={id}
          className={clsx(styles.file__upload, {
            [styles.file__upload__error]: error
          })}>
          <IconSvg
            color={'main-white'}
            name={'documents'}
            size={30}
          />
          {error || `Добавить`}
        </label>}
        {imagesId && imagesId.length > 0 && imagesId.map((e, i) => (
          <div key={i} className={styles.image_wrapper}>
            <img className={styles.image} src={withUrlImages(e)}/>
          </div>
        ))}
      </div>


      {error && <div className={styles.main_error}>{error}</div>}
    </div>
  );
};
