import { act, renderHook } from '@testing-library/react'
import useStore from '../../hooks/useStore'
import StoreProvider from '../../providers/StoreProvider'
import { AuthAction } from '../Auth'

describe('Auth', () => {
  const wrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <StoreProvider>{children}</StoreProvider>
  }
  it('logs in the user', () => {
    const { result } = renderHook(() => useStore(), { wrapper })

    act(() => {
      result.current.dispatch({ type: AuthAction.LOGIN, activeUser: 'Voldemort' })
    })

    expect(result.current.store.auth?.activeUser).toBe('Voldemort')
    expect(result.current.store.auth?.users).toMatchObject(['Joyse', 'Sam', 'Russell', 'Voldemort'])
  })
})
