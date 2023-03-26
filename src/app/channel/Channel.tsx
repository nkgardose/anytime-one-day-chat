/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import ChannelList from './ChannelList'
import { channel } from './style'
import Users from './Users'

interface IChannel {
  channels: string[]
}

const Channel: React.FunctionComponent<IChannel> = ({ channels }) => {
  const theme = useTheme()

  return (
    <div css={channel(theme)}>
      <Users />
      <ChannelList channels={channels} />
    </div>
  )
}

export default Channel
