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

type Props = {
  mode: 'create' | 'update';
  control: Control<any>;
  images: string[]
}


export const PublicationsForm: FC<Props> = ({mode, control, images, ...props}) => {

  const options = useMemo(() => ([{value: 'news', label: 'Новости'}, {value: 'events', label: 'События'}, {
    value: 'post',
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
          <Controller name={'title'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Заголовок'} placeholder={'Введите заголовок публикации'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'category'} control={control} render={({field}) => (
            <SelectEditor options={options} {...field} label={'Категории'}/>
          )}/>
        </div>
        <div className={clsx(styles.main_field, styles.two_column)}>
          <Controller name={'description'} control={control} render={({field}) => (
            <TextareaEditor {...field} label={'Описание'}
                            placeholder={'Опишите событие, поделитесь деталями или добавьте полезные ссылки'}/>
          )}/>
        </div>
        <div className={clsx(styles.two_column)}>
          <Controller name={'date'} control={control} render={({field}) => (
            <DateEditor {...field} label={'Дата публикации'}
                        description={'Новость появится в ленте утром выбранного дня'}/>
          )}/>
        </div>
        <div className={clsx(styles.main_field, styles.two_column)}>
          <Controller name={'files'} control={control} render={({field}) => (
            <FileEditor {...field} label={'Фотографии'} imagesId={images}
                        description={'Можно прикрепить до 6 фотографий (формат .jpg или .png)'}/>
          )}/>
        </div>


      </div>
      <div className={styles.button_panel}>
        <Button title={'Опубликовать'} size={'small'} />
      </div>
    </>
  )
}