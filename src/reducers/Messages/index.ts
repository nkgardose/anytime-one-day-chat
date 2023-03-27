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
  SEND_MESSAGE = 'SEND_MESSAGE',
  SET_MESSAGES = 'SET_MESSAGES'
}

interface SendMessageAction {
  type: typeof MessagesAction.SEND_MESSAGE
  message: Message
  channel: string
}

interface SetMessagesAction {
  type: typeof MessagesAction.SET_MESSAGES
  channel: string
  messages: Message[]
}

export type MessagesActionType = SendMessageAction | SetMessagesAction

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
        [action.channel]: messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      }
    }
    case MessagesAction.SET_MESSAGES: {
      const uniqueMessages = action.messages.reduce((unique: Message[], o: Message) => {
        if (!unique.some((obj) => obj.messageId === o.messageId)) {
          unique.push(o)
        }
        return unique
      }, [])
      return {
        ...store,
        [action.channel]: uniqueMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      }
    }
    default:
      return { ...store }
  }
}

export default MessagesReducer
