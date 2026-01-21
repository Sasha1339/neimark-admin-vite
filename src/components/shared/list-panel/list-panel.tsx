import type {ChangeEvent, FC, PropsWithChildren} from "react";
import styles from './list-panel.module.css';
import clsx from "clsx";
import {Button} from "@/components/shared/button/button.tsx";

type Props = {
  isSearching?: boolean;
  isNewButton?: boolean;
  placeholder?: string;
  titleNewButton?: string;
  uploadYetButtonShow?: boolean;
  onSearchChange?: (value: string) => void;
  onClickNewButton?: () => void;
  onUploadYet?: () => void;
  width?: number;
}

export const ListPanel: FC<Props & PropsWithChildren> = ({children, onClickNewButton, uploadYetButtonShow = false, onUploadYet, placeholder, titleNewButton, isNewButton = false, width = 300, onSearchChange, isSearching = false, ...props}) => {

  const onChange = (e: ChangeEvent<HTMLInputElement> ) => {
    onSearchChange?.(e.target.value);
  }

  return (
    <div className={clsx({[styles.wrapper_mini]: !isSearching}, {[styles.wrapper]: isSearching})} style={{width: `${width}px`}}>
      {isSearching && <div className={styles.search}>
        <input className={styles.input} onChange={onChange} placeholder={placeholder ?? 'Введите значение'}/>
      </div>}
      <div className={clsx(styles.main, {[styles.main_with_is_buttons]: isNewButton})}>
        {children}
        {uploadYetButtonShow && <Button title={'Загрузить еще'} size={'small'} onClick={onUploadYet}/>}
      </div>
      {isNewButton && <div className={styles.button_panel}>
        <Button title={titleNewButton ?? 'Добавить новое'} size={'small'} onClick={onClickNewButton} />
      </div>}
    </div>

  )

}