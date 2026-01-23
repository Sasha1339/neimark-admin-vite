import {type FC, useEffect, useState} from "react";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import styles from './chat.module.css';
import clsx from "clsx";
import {useParams} from "react-router-dom";
import {useAppSelector} from "@/services/store.ts";
import {serviceSelectors} from "@/services/service.ts";
import {CONCIERGE_SYSTEM_ID} from "@/shared/services/const.ts";
import {useGetAllMessagesByChatMutation, useGetChatMutation} from "@/middlewares/service.ts";

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

  const params = useParams<{id: string}>();
  const messages = useAppSelector(serviceSelectors.chatMessages);
  const [getMessages] = useGetAllMessagesByChatMutation();
  const [getChat] = useGetChatMutation();
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    if (params.id) {
      getChat({chatId: params.id});
      getMessages({chatId: params.id})
    }
  }, [params.id]);

  return (
    <div className={styles.main}>

      <div className={styles.content}>
        {messages.map((e, i) => (
          <div key={i} className={clsx(e.sender_id === CONCIERGE_SYSTEM_ID ? styles.message_right : styles.message_left)}>
            <div className={styles.message}>{e.content}</div>
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
