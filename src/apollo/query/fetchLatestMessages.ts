import { gql } from '@apollo/client'

const FETCH_LATEST_MESSAGE = gql`
  query MessagesFetchLatest($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`

export default FETCH_LATEST_MESSAGE
