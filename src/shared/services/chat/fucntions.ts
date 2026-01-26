import {type MessageForm, ServiceStatus} from "@/shared/services/types.ts";

export const prepareMessage = (status: ServiceStatus, chatId: string)  => {

  switch (status) {
    case ServiceStatus.CANCELLED:
      return getMessage(messageCancelWithDate(), chatId);
    case ServiceStatus.ACCEPTED:
      return getMessage(messageAcceptWithDate(), chatId);
    case ServiceStatus.COMPLETED:
      return getMessage(messageCompleteWithDate(), chatId);
    case ServiceStatus.PENDING:
      return getMessage(messagePendingWithDate(), chatId);
    default:
      return null;
  }
}

export const messageAcceptWithDate = () => `Начато выполнение услуги. Пожалуйста, на время выполнения услуги по возможности не посещайте комнату, от этого зависит качество выполнения услуги. Спасибо за понимание.`
export const messagePendingWithDate = () => `Статус услуги был изменен на "В ожидании", пожалуйста, ожидайте когда персонал сможет назначить выполнение запрошенной услуги.`
export const messageCancelWithDate = () => `В связи с неполадками в системе мы отменили выполнение запрошенной услуги. Пожалуйста, переназначте время выбранную Вами услугу.`
export const messageCompleteWithDate = () => `Выполнение услуги успешно завершено. Пожалуйста, оцените качество предоставленной услуги.`

export const getMessage = (content: string, chatId: string): MessageForm =>
  ({
    conversation_id: chatId,
    content: content,
    sender_id: 'concierge_system',
    sender_name: 'Консьерж-сервис',
    message_type: 'text',
    created_at: new Date().toLocaleDateString()
  })
