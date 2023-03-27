/** @jsxImportSource @emotion/react */
import React, { type PropsWithChildren } from 'react'
import { Link, useParams } from 'react-router-dom'
import { active, channelItem } from './style'

interface IChannelItem extends PropsWithChildren {
  to: string
}

const ChannelItem: React.FunctionComponent<IChannelItem> = ({ children, to }) => {
  const { channel } = useParams()

  return (
    <li css={[channelItem, channel === to ? active : '']}>
      <Link to={`/chat/${to}`}>{children} Channel</Link>
    </li>
  )
}

export default ChannelItem
