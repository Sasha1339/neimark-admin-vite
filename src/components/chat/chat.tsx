import {type FC, useState} from "react";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import styles from './chat.module.css';
import clsx from "clsx";

const messages = [
  {
    date: '2027-02-17T07:00:00.000Z',
    message: 'Здравствуйте! Ваша заявка КЛ-00001 на услугу «Клининг (бесплатно) » успешно создана.\n- Описание: Без дополнительных комментариев\nЛокация: Корпус А2, комната 201\nПланируемое время: 21 октября 2025 г., 10:00\nКонтактный телефон: +89999999999\nКоманда консьерж-сервиса свяжется с вами для подтверждения времени уборки.\nЕсли потребуется дополнительная информация, мы свяжемся с вами в этом чате.',
    sender: 'service'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  },
  {
    date: '2027-02-17T08:10:00.000Z',
    message: 'Привет',
    sender: 'user'
  }
]

const actions = [
  {
    command: 'cancel',
    label: 'Отозвать услугу'
  },
  {
    command: 'edit_date',
    label: 'Переназначить дату'
  },
  {
    command: 'processing',
    label: 'Выполняется'
  },
  {
    command: 'done',
    label: 'Выполнено'
  },
  {
    command: 'set_self',
    label: 'Назначить себя'
  }
]

type Props = {

}

export const Chat: FC<Props> = () => {

  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className={styles.main}>

      <div className={styles.content}>
        {messages.map((e, i) => (
          <div key={i} className={clsx(e.sender === 'service' ? styles.message_right : styles.message_left)}>
            <div className={styles.message}>{e.message}</div>
          </div>
        ))}
      </div>

      {openOptions && <div className={styles.options}>
        <div className={styles.wrapper}>
          <div className={styles.overlay}></div>
          <div className={styles.list_options}>
            <div className={styles.title}>Быстрые действия</div>
            {actions.map((e, i) => (
              <div className={styles.option} key={i}>{e.label}</div>
            ))}
          </div>
        </div>
      </div>}

      <div className={styles.input}>
        <input className={styles.input__line}/>
        <IconSvg name={'arrow'} rotate={180}/>
        <IconSvg name={'expand-button'} onClick={() => setOpenOptions(!openOptions)} className={styles.icon} />
      </div>
    </div>
  )
}
