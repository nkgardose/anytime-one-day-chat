/** @jsxImportSource @emotion/react */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import localforage from 'localforage'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import MESSAGE_POST from '../../apollo/mutation/messagePost'
import FETCH_LATEST_MESSAGE from '../../apollo/query/fetchLatestMessages'
import FETCH_MORE_MESSAGES from '../../apollo/query/fetchMoreMessages'
import Header from '../../components/header'
import useStore from '../../hooks/useStore'
import { MessagesAction, MessageStatus, type Message } from '../../reducers/Messages'
import MessageInput, { type IMessageInputHandle } from './MessageInput'
import Messages from './Messages'
import { chatBox } from './style'

const ChatBox = (): JSX.Element => {
  const { store, dispatch } = useStore()
  const { channel } = useParams()
  const { data, loading } = useQuery(FETCH_LATEST_MESSAGE, {
    variables: { channelId: channel ?? '' },
    fetchPolicy: 'network-only'
  })
  const [postMessage] = useMutation(MESSAGE_POST)
  const messageInput = useRef<IMessageInputHandle>(null)
  const [message, setMessage] = useState('')

  const messages = useMemo(() => {
    if (store.messages !== undefined && channel !== undefined) return store.messages[channel] ?? []
    return []
  }, [store.messages, channel])
  const [fetchMoreMessage] = useLazyQuery(FETCH_MORE_MESSAGES, {
    variables: { channelId: channel ?? '', messageId: messages.length > 0 ? messages[0].messageId : '', old: true }
  })

  useEffect(() => {
    if (data?.fetchLatestMessages !== undefined && channel !== undefined) {
      dispatch({
        type: MessagesAction.SET_MESSAGES,
        messages: data.fetchLatestMessages
          .map(
            (message: any): Message => ({
              messageId: message.messageId,
              text: message.text,
              timestamp: new Date(message.datetime),
              userId: message.userId,
              status: MessageStatus.SENT
            })
          )
          .sort((a: Message, b: Message) => a.timestamp.getTime() - b.timestamp.getTime()),
        channel
      })
    }
  }, [data])

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

  const sendMessage = async (user: string, channel: string): Promise<void> => {
    try {
      const res = await postMessage({
        variables: {
          channelId: channel,
          text: message,
          userId: user
        }
      })

      if (res.data !== undefined) {
        const message = res.data.postMessage
        dispatch({
          type: MessagesAction.SEND_MESSAGE,
          channel,
          message: {
            messageId: message.messageId,
            text: message.text,
            timestamp: new Date(message.datetime),
            userId: user,
            status: MessageStatus.SENT
          }
        })
      }
      if (res.errors !== undefined) {
        dispatch({
          type: MessagesAction.SEND_MESSAGE,
          channel,
          message: {
            messageId: Math.random().toString(),
            text: message,
            timestamp: new Date(),
            userId: user,
            status: MessageStatus.ERROR
          }
        })
      }
    } catch (e) {
      dispatch({
        type: MessagesAction.SEND_MESSAGE,
        channel,
        message: {
          messageId: Math.random().toString(),
          text: message,
          timestamp: new Date(),
          userId: user,
          status: MessageStatus.ERROR
        }
      })
    }
  }

  const onSend = (): void => {
    if (channel !== undefined && store.auth?.activeUser !== undefined) {
      messageInput.current?.clear()
      if (store.auth.activeUser !== undefined && channel !== undefined) {
        void sendMessage(store.auth.activeUser, channel)
      }
    }
  }

  const onFetchOld = async (): Promise<void> => {
    try {
      const { data } = await fetchMoreMessage()
      if (data !== undefined && channel !== undefined) {
        dispatch({
          type: MessagesAction.SET_MESSAGES,
          messages: [
            ...messages,
            ...(data.fetchMoreMessages ?? []).map(
              (message: any): Message => ({
                messageId: message.messageId,
                text: message.text,
                timestamp: new Date(message.datetime),
                userId: message.userId,
                status: MessageStatus.SENT
              })
            )
          ],
          channel
        })
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div css={chatBox}>
      <Header>{channel} Channel</Header>
      <Messages messages={messages ?? []} onFetchOld={onFetchOld} />
      <MessageInput ref={messageInput} loading={loading} onChange={onChange} sendMessage={onSend} />
    </div>
  )
}

export default ChatBox
