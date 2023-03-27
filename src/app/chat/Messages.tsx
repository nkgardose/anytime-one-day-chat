/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { MdNorth } from 'react-icons/md'
import { type Message } from '../../reducers/Messages'
import MessageBubble from './MessageBubble'
import { messages as messagesStyle, observer, button } from './style'

interface IMessages {
  messages: Message[]
  onFetchOld: () => any
}

const Messages: React.FunctionComponent<IMessages> = ({ messages, onFetchOld }) => {
  const theme = useTheme()
  return (
    <div css={messagesStyle}>
      {messages.length >= 10 ? (
        <div css={observer}>
          <button css={button(theme)} onClick={onFetchOld}>
            Read More
            <span>
              <MdNorth />
            </span>
          </button>
        </div>
      ) : null}

      {messages.map((message, i) => {
        const isLast = i + 1 === messages.length || messages[i + 1].userId !== message.userId

        return (
          <MessageBubble
            ref={(el) => {
              if (el !== null) {
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
