/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import React, { forwardRef, useMemo } from 'react'
import useStore from '../../hooks/useStore'
import { type MessageStatus } from '../../reducers/Messages'
import { avatarContainer, meBubble, meContent, messageBubble, messageContent } from './style'

interface IMessageBubble {
  src: string | null
  name: string
  text: string
  status: MessageStatus
  timestamp: Date | null
}

const MessageBubble: React.ForwardRefRenderFunction<HTMLDivElement, IMessageBubble> = (
  { src, name, text, status, timestamp },
  ref
) => {
  const { store } = useStore()
  const theme = useTheme()

  const isMe: boolean = useMemo(() => {
    return store.auth?.activeUser === name ?? false
  }, [store.auth?.activeUser])

  const convert = (time: number): string => {
    return `${time.toString().length < 2 ? '0' : ''}${time}`
  }

  return (
    <div css={[messageBubble, isMe ? meBubble : '']} ref={ref}>
      <div css={avatarContainer}>
        {src !== null ? (
          <>
            <img src={src} alt={name} />
            <span>{name}</span>
          </>
        ) : null}
      </div>
      <div css={[messageContent, isMe ? meContent(theme) : '']}>
        <p>{text}</p>
        <span>{timestamp !== null ? `${convert(timestamp.getHours())}:${convert(timestamp.getMinutes())}` : null}</span>
      </div>
    </div>
  )
}

export default forwardRef(MessageBubble)
