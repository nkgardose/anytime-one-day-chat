/** @jsxImportSource @emotion/react */
import localforage from 'localforage'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header'
import useStore from '../../hooks/useStore'
import { MessagesAction, MessageStatus } from '../../reducers/Messages'
import MessageInput, { type IMessageInputHandle } from './MessageInput'
import Messages from './Messages'
import { chatBox } from './style'

const ChatBox = (): JSX.Element => {
  const { store, dispatch } = useStore()
  const { channel } = useParams()
  const messageInput = useRef<IMessageInputHandle>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (channel !== undefined)
      void localforage.getItem(`${channel}.message`).then((message = '') => {
        messageInput.current?.setValue(message as string)
      })
  }, [channel])

  useEffect(() => {
    if (channel !== undefined) void localforage.setItem(`${channel}.message`, message)
  }, [message])

  const onChange = (value: string): void => {
    setMessage(value)
  }

  const onSend = (): void => {
    if (channel !== undefined && store.auth?.activeUser !== undefined) {
      messageInput.current?.clear()
      dispatch({
        type: MessagesAction.SEND_MESSAGE,
        channel,
        message: {
          messageId: Math.random().toString(),
          text: message,
          timestamp: new Date(),
          userId: store.auth?.activeUser,
          status: MessageStatus.SENT
        }
      })
    }
  }

  return (
    <div css={chatBox}>
      <Header>{channel} Channel</Header>
      <Messages />
      <MessageInput ref={messageInput} onChange={onChange} sendMessage={onSend} />
    </div>
  )
}

export default ChatBox
