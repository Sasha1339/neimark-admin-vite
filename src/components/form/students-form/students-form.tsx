import {type Control, Controller} from "react-hook-form";
import styles from './students-form.module.css';
import {type FC, useMemo} from "react";
import {InputEditor} from "@/components/shared/input-editor/input-editor.tsx";
import {Button} from "@/components/shared/button/button.tsx";
import {SelectPanelEditor} from "@/components/shared/select-panel-editor/select-panel-editor.tsx";
import {DocumentsEditor} from "@/components/shared/documents-editor/documents-editor.tsx";

type Props = {
  mode: 'create' | 'update';
  control: Control<any>;
}



export const StudentsForm: FC<Props> = ({mode, control, ...props}) => {

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

  const documents = useMemo(() => ([
    {
      name: '123',
      date: '2027-02-17T07:00:00.000Z'
    },
    {
      name: '123',
      date: '2027-02-17T07:00:00.000Z'
    },
    {
      name: '123',
      date: '2027-02-17T07:00:00.000Z'
    },
    {
      name: '123',
      date: '2027-02-17T07:00:00.000Z'
    }
  ]), [])

  const optionsCourse = useMemo(() => ([
    {
      value: '1',
      label: '1 курс'
    },
    {
      value: '2',
      label: '2 курс'
    },
    {
      value: '3',
      label: '3 курс'
    },
    {
      value: '4',
      label: '4 курс'
    },
    {
      value: '5',
      label: '5 курс'
    },
    {
      value: '6',
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
          <Controller name={'lastname'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Фамилия'} placeholder={'Введите фамилию'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'firstname'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Имя'} placeholder={'Введите имя'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'patronymic'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Отчество'} placeholder={'Введите отчество'}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Контакты</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'email'} control={control} render={({field}) => (
            <InputEditor {...field} label={'E-mail'} placeholder={'Введите email'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'phone'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Телефон'} placeholder={'Введите телефон'}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Образование</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'university'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Университет'} placeholder={'Введите наименование университета'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'faculty'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Факультет'} placeholder={'Введите наименование факультета'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'direction'} control={control} render={({field}) => (
            <SelectPanelEditor {...field} label={'Направление подготовки'} options={optionsDirection}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'stream'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Поток'} placeholder={'Введите поток'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'group'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Группа'} placeholder={'Введите группу'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'course'} control={control} render={({field}) => (
            <SelectPanelEditor {...field} label={'Курс'} options={optionsCourse}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Проживание</div>
        </div>
        <div className={styles.main_field}>
          <Controller name={'building'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Корпус'} placeholder={'Введите корпус проживания'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'room'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Комната'} placeholder={'Введите комнату проживания'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'additionally'} control={control} render={({field}) => (
            <InputEditor {...field} label={'Дополнительно'} placeholder={''}/>
          )}/>
        </div>
        <div className={styles.main_header}>
          <div className={styles.main_header_text}>Документы</div>
        </div>
        <div className={styles.documents}>
          {documents.map((e, i) => (
            <DocumentsEditor key={i} document={e} />
          ))}
        </div>
      </div>
      <div className={styles.button_panel}>
        <Button title={'Сохранить'} size={'small'}/>
      </div>
    </>
  )
}