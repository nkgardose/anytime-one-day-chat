import { gql } from '@apollo/client'

const FETCH_MORE_MESSAGES = gql`
  query MessagesFetchMore($channelId: String!, $messageId: String!, $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`

export default FETCH_MORE_MESSAGES
