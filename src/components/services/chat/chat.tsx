import {type FC, useEffect, useState} from "react";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import styles from './chat.module.css';
import clsx from "clsx";
import {useParams} from "react-router-dom";
import {useAppSelector} from "@/services/store.ts";
import {serviceSelectors} from "@/services/service.ts";
import {CONCIERGE_SYSTEM_ID} from "@/shared/services/const.ts";
import {
  useCreateMessageMutation,
  useGetAllMessagesByChatMutation,
  useGetChatMutation,
  useUpdateStatusServiceByIdMutation
} from "@/middlewares/service.ts";
import {ServiceStatus} from "@/shared/services/types.ts";
import {prepareMessage} from "@/shared/services/chat/fucntions.ts";
import {ID} from "appwrite";

const actions = [
  {
    command: ServiceStatus.CANCELLED,
    label: 'Отозвать услугу'
  },
  {
    command: ServiceStatus.PENDING,
    label: 'Выполняется'
  },
  {
    command: ServiceStatus.COMPLETED,
    label: 'Выполнено'
  },
  {
    command: ServiceStatus.ACCEPTED,
    label: 'Назначить себя'
  }
]

type Props = {

}

export const Chat: FC<Props> = () => {

  const params = useParams<{serviceId: string; chatId: string}>();
  const messages = useAppSelector(serviceSelectors.chatMessages);
  const [getMessages] = useGetAllMessagesByChatMutation();
  const [sendMessage] = useCreateMessageMutation();
  const [updateStatus] = useUpdateStatusServiceByIdMutation();
  const [getChat] = useGetChatMutation();
  const [openOptions, setOpenOptions] = useState(false);



  useEffect(() => {
    if (params.chatId) {
      getChat({chatId: params.chatId});
      getMessages({chatId: params.chatId})
    }
  }, [params.chatId]);

  const onSelectStatus = (option: {command: ServiceStatus, label: string}) => {
    if (params.chatId && params.serviceId) {
      const message = prepareMessage(option.command, params.chatId)
      if (message) {
        updateStatus({status: option.command, serviceId: params.serviceId});
        sendMessage({messageId: ID.unique(), message})
      }
    }
  }

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
              <div className={styles.option} key={i} onClick={() => onSelectStatus(e)}>{e.label}</div>
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
