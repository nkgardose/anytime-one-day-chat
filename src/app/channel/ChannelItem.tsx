/** @jsxImportSource @emotion/react */
import React, { type PropsWithChildren } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { channelItem, active } from './style'

interface IChannelItem extends PropsWithChildren {
  to: string
}

const ChannelItem: React.FunctionComponent<IChannelItem> = ({ children, to }) => {
  const { channel } = useParams()
  const navigate = useNavigate()

  const onClick = (): void => {
    navigate(`/chat/${to}`)
  }

  return (
    <li css={[channelItem, channel === to ? active : '']} onClick={onClick} aria-hidden>
      {children} Channel
    </li>
  )
}

export default ChannelItem
