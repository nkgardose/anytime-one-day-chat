/** @jsxImportSource @emotion/react */
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../hooks/useStore'
import { type Message } from '../../reducers/Messages'
import MessageBubble from './MessageBubble'
import { messages as messagesStyle } from './style'

const Messages = (): JSX.Element => {
  const { store } = useStore()
  const { channel } = useParams()

  const messages: Message[] = useMemo(() => {
    if (channel !== undefined && store.messages !== undefined)
      return store.messages[channel] !== undefined ? store.messages[channel] : []
    return []
  }, [channel, store.messages])

  return (
    <div css={messagesStyle}>
      {messages.map((message, i) => {
        const isLast = i + 1 === messages.length || messages[i + 1].userId !== message.userId
        return (
          <MessageBubble
            ref={(el) => {
              if (el != null) {
                el.scrollIntoView()
              }
            }}
            key={message.messageId}
            src={
              isLast
                ? 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
                : null
            }
            text={message.text}
            timestamp={message.timestamp}
            status={message.status}
            name={message.userId}
          />
        )
      })}
    </div>
  )
}

export default Messages
