import {type FC, type InputHTMLAttributes, useEffect, useMemo, useState} from 'react';
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
  onChangeDelete?: (value: File[]) => void;
  error?: string;
}

export const FileEditor: FC<Props> = ({
                                        label,
                                        description,
                                        files,
                                        imagesId,
                                        onChangeDelete,
                                        error,
                                        disabled = false,
                                        ...props
                                      }) => {

  const id = useMemo(() => (uuidv4()), []);
  const [fileImages, setFileImages] = useState<string[]>([]);

  useEffect(() => {
    const images: string[] = []
    if (files) {
      Array.from(files).forEach((file) => {
        images.push(URL.createObjectURL(file))
      })
    }
    setFileImages(images)
  }, [files]);

  const onDeleteFileByIndex = (index: number) => {
    if (files) {
      const filesUpdate = Array.from(files).filter((e, i) => i !== index);
      onChangeDelete?.(filesUpdate);
    }
  }


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
          multiple={true}
          accept="image/*"
          disabled={disabled}
          className={styles.main_input}
        />
        {<label
          htmlFor={id}
          className={clsx(styles.file__upload, {
            [styles.file__upload__error]: error
          })}>
          {!error && <IconSvg
            color={'main-white'}
            name={'documents'}
            size={30}
          />}
          {error || `Добавить`}
        </label>}
        {files && Array.from(files).map((e, i) => (
          <div key={i} className={styles.image_wrapper}>
            <img className={styles.image} src={URL.createObjectURL(e)}/>
            <div className={styles.image_overlay} onClick={() => onDeleteFileByIndex(i)}>
              Удалить
            </div>

          </div>
        ))}
        {imagesId && imagesId.length > 0 && imagesId.map((e, i) => (
          <div key={i} className={styles.image_wrapper}>
            <img className={styles.image} src={withUrlImages(e)}/>
            <div className={styles.image_overlay}>Удалить</div>
          </div>
        ))}
      </div>


      {error && <div className={styles.main_error}>{error}</div>}
    </div>
  );
};
