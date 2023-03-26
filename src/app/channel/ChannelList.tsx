/** @jsxImportSource @emotion/react */
import React from 'react'
import ChannelItem from './ChannelItem'
import { channelList } from './style'

interface IChannelList {
  channels: string[]
}

const ChannelList: React.FunctionComponent<IChannelList> = ({ channels }) => (
  <ul css={channelList}>
    {channels.map((channel) => (
      <ChannelItem key={channel} to={channel}>
        {channel}
      </ChannelItem>
    ))}
  </ul>
)

export default ChannelList
