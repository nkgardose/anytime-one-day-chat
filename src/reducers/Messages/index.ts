export enum MessageStatus {
  SENT,
  ERROR,
  SENDING
}

export interface Message {
  messageId: string
  text: string
  timestamp: Date
  userId: string
  status: MessageStatus
}

export type MessagesState = Record<string, Message[]>

export enum MessagesAction {
  SEND_MESSAGE = 'SEND_MESSAGE'
}

interface SendMessageAction {
  type: typeof MessagesAction.SEND_MESSAGE
  message: Message
  channel: string
}

export type MessagesActionType = SendMessageAction

export type IMessagesReducer = (store: MessagesState, action: MessagesActionType) => MessagesState

const MessagesReducer: IMessagesReducer = (store, action) => {
  switch (action.type) {
    case MessagesAction.SEND_MESSAGE: {
      const messages: Message[] = [
        ...(action.channel !== undefined && store[action.channel] !== undefined ? store[action.channel] : [])
      ]
      if (action.message !== undefined) messages.push(action.message)
      return {
        ...store,
        [action.channel]: messages
      }
    }
    default:
      return { ...store }
  }
}

export default MessagesReducer
