import { renderHook } from '@testing-library/react'
import { type PropsWithChildren } from 'react'
import StoreProvider from '../../providers/StoreProvider'
import useStore from '../useStore'

describe('useStore', () => {
  const wrapper: React.FunctionComponent<PropsWithChildren> = ({ children }) => (
    <StoreProvider>{children}</StoreProvider>
  )

  it('returns the corret StoreProvider content', () => {
    const { result } = renderHook(() => useStore(), { wrapper })

    expect(result.current.dispatch).not.toBeUndefined()
    expect(result.current.store).not.toBeUndefined()
    expect(result.current.store.auth?.activeUser).toBe('Joyse')
    expect(result.current.store.auth?.users).toMatchObject(['Joyse', 'Sam', 'Russell'])
  })
})
