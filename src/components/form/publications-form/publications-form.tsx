import {type Control, Controller} from "react-hook-form";
import styles from './publications-form.module.css';
import {type FC, useMemo} from "react";
import {InputEditor} from "@/components/shared/input-editor/input-editor.tsx";
import {SelectEditor} from "@/components/shared/select-editor/select-editor.tsx";
import clsx from "clsx";
import {TextareaEditor} from "@/components/shared/textarea-editor/textarea-editor.tsx";
import {DateEditor} from "@/components/shared/date-editor/date-editor.tsx";
import {FileEditor} from "@/components/shared/file-editor/file-editor.tsx";
import {Button} from "@/components/shared/button/button.tsx";
import {PublicationCategory} from "@/shared/publications/types.ts";

type Props = {
  mode: 'create' | 'update';
  control: Control<any>;
  images: string[],
  disabledButtonSaved?: boolean;
  onDeleteImage?: (id: string) => void;
  onPublic: () => void;
}


export const PublicationsForm: FC<Props> = ({mode, onPublic, onDeleteImage, control, disabledButtonSaved = false, images, ...props}) => {

  const options = useMemo(() => ([{value: PublicationCategory.NEWS, label: 'Новости'}, {value: PublicationCategory.EVENT, label: 'События'}, {
    value: PublicationCategory.ANNOUNCEMENT,
    label: 'Объявления'
  }]), [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Новая публикация</div>
          <div className={styles.main_subheader_text}>Заполните данные и прикрепите изображения. Первая фотография
            станет
            обложкой.
          </div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'title'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} label={'Заголовок'} error={fieldState.error?.message?.toString()} placeholder={'Введите заголовок публикации'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'category'} control={control} render={({field, fieldState}) => (
            <SelectEditor  error={fieldState.error?.message?.toString()} options={options} {...field} label={'Категории'}/>
          )}/>
        </div>
        <div className={clsx(styles.main_field, styles.two_column)}>
          <Controller name={'content'} control={control} render={({field, fieldState}) => (
            <TextareaEditor {...field} label={'Описание'} error={fieldState.error?.message?.toString()}
                            placeholder={'Опишите событие, поделитесь деталями или добавьте полезные ссылки'}/>
          )}/>
        </div>
        <div className={clsx(styles.two_column)}>
          <Controller name={'published_at'} control={control} render={({field, fieldState}) => (
            <DateEditor {...field} label={'Дата публикации'} error={fieldState.error?.message?.toString()}
                        description={'Новость появится в ленте утром выбранного дня'}/>
          )}/>
        </div>
        <div className={clsx(styles.main_field, styles.two_column)}>
          <Controller name={'files'} control={control} render={({field: {onChange, value}, fieldState}) => (
            <FileEditor files={value} onChangeDelete={(value) => onChange(value)} onChange={(e) => onChange(e && e.target.files && value ? [...e.target.files, ...value] : e && e.target.files ? e.target.files : value)} label={'Фотографии'} images={images} error={fieldState.error?.message?.toString()}
                        description={'Можно прикрепить до 6 фотографий (формат .jpg или .png)'}
                        onDeleteImage={onDeleteImage}/>
          )}/>
        </div>


      </div>
      <div className={styles.button_panel}>
        <Button title={mode === 'create' ? 'Опубликовать' : 'Сохранить изменения'} disabled={disabledButtonSaved} size={'small'} onClick={onPublic} />
      </div>
    </>
  )
}