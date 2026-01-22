import {type Control, Controller} from "react-hook-form";
import styles from './students-form.module.css';
import {type FC, useMemo} from "react";
import {InputEditor} from "@/components/shared/input-editor/input-editor.tsx";
import {Button} from "@/components/shared/button/button.tsx";
import {SelectPanelEditor} from "@/components/shared/select-panel-editor/select-panel-editor.tsx";
import {DocumentsEditor} from "@/components/shared/documents-editor/documents-editor.tsx";
import type {DocumentFile} from "@/shared/documents/types.ts";

type Props = {
  mode: 'create' | 'update';
  control: Control<any>;
  documents?: DocumentFile[] | null;
  onSave: () => void;
  onDelete?: () => void;
}


export const StudentsForm: FC<Props> = ({mode, onSave, onDelete, documents, control, ...props}) => {

  const optionsDirection = useMemo(() => ([
    {
      value: '123',
      label: 'Математика'
    },
    {
      value: '124',
      label: 'Информатика'
    },
    {
      value: '125',
      label: 'Физика'
    },
    {
      value: '126',
      label: 'IT'
    }
  ]), [])

  const optionsCourse = useMemo(() => ([
    {
      value: 1,
      label: '1 курс'
    },
    {
      value: 2,
      label: '2 курс'
    },
    {
      value: 3,
      label: '3 курс'
    },
    {
      value: 4,
      label: '4 курс'
    },
    {
      value: 5,
      label: '5 курс'
    },
    {
      value: 6,
      label: '6 курс'
    }
  ]), [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Личные данные студента</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'last_name'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Фамилия'}
                         placeholder={'Введите фамилию'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'first_name'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Имя'}
                         placeholder={'Введите имя'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'patronymic'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Отчество'}
                         placeholder={'Введите отчество'}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Контакты</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'email'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'E-mail'}
                         placeholder={'Введите email'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'phone_number'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Телефон'}
                         placeholder={'Введите телефон'}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Образование</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'university'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Университет'}
                         placeholder={'Введите наименование университета'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'faculty'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Факультет'}
                         placeholder={'Введите наименование факультета'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'field_of_study'} control={control} render={({field, fieldState}) => (
            <SelectPanelEditor {...field} error={fieldState.error?.message?.toString()} label={'Направление подготовки'}
                               options={optionsDirection}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'cohort'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Поток'}
                         placeholder={'Введите поток'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'group'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Группа'}
                         placeholder={'Введите группу'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'year_of_study'} control={control} render={({field, fieldState}) => (
            <SelectPanelEditor {...field} error={fieldState.error?.message?.toString()} label={'Курс'}
                               options={optionsCourse}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Проживание</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'building'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Корпус'}
                         placeholder={'Введите корпус проживания'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'room_number'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Комната'}
                         placeholder={'Введите комнату проживания'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'residence_comment'} control={control} render={({field, fieldState}) => (
            <InputEditor {...field} error={fieldState.error?.message?.toString()} label={'Дополнительно'}
                         placeholder={''}/>
          )}/>
        </div>
        {documents && documents.length > 0 && <>
          <div className={styles.main_header}>
            <div className={styles.main_header_text}>Документы</div>
          </div>
          <div className={styles.documents}>
            {documents.map((e) => (
              <DocumentsEditor key={e.$id} document={e}/>
            ))}
          </div>
        </>}
      </div>
      {mode === 'update' ? <div className={styles.button_panel}>
        <Button title={'Сохранить изменения'} size={'small'} onClick={onSave}/>
        <Button title={'Удалить студента'} size={'small'} color={'main-red'} onClick={onDelete} disabled={true}/>
      </div> : <div className={styles.button_panel}>
        <Button title={'Создать студента'} size={'small'} onClick={onSave}/>
      </div>}
    </>
  )
}