import { act, renderHook } from '@testing-library/react'
import useStore from '../../hooks/useStore'
import StoreProvider from '../../providers/StoreProvider'
import { MessagesAction, MessageStatus } from '../Messages'

describe('Auth', () => {
  const wrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <StoreProvider>{children}</StoreProvider>
  }
  it('sends a message', () => {
    const { result } = renderHook(() => useStore(), { wrapper })
    const timestamp = new Date()

    act(() => {
      result.current.dispatch({
        type: MessagesAction.SEND_MESSAGE,
        channel: 'Test',
        message: {
          userId: 'Joyse',
          messageId: '0',
          status: MessageStatus.SENDING,
          text: 'This is a test message',
          timestamp
        }
      })
    })

    expect(result.current.store.messages).not.toBeUndefined()
    expect(result.current.store.messages).toMatchObject({
      Test: [
        { userId: 'Joyse', messageId: '0', text: 'This is a test message', status: MessageStatus.SENDING, timestamp }
      ]
    })
  })
})
