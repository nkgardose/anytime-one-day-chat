import { gql } from '@apollo/client'

const MESSAGE_POST = gql`
  mutation MessagePost($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`

export default MESSAGE_POST
