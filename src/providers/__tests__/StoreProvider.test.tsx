import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import useStore from '../../hooks/useStore'
import { AuthAction } from '../../reducers/Auth'
import StoreProvider from '../StoreProvider'
import '@testing-library/jest-dom'
import { users } from '../../utils/constants'

const TestComponent = (): JSX.Element => {
  const { store, dispatch } = useStore()

  useEffect(() => {
    dispatch({
      type: AuthAction.LOGIN,
      activeUser: 'Ronaldo'
    })
  }, [dispatch])

  return (
    <>
      <ul>
        {store.auth?.users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <div>{store?.auth?.activeUser}</div>
    </>
  )
}

describe('<StoreProvider>', () => {
  it('provides store to the wrapped component', () => {
    const users = ['Ronaldo', 'Messi']
    render(
      <StoreProvider
        defaultStore={{
          auth: { activeUser: 'Messi', users }
        }}
      >
        <TestComponent />
      </StoreProvider>
    )
    const items = screen.getAllByRole('listitem')

    expect(items.length).toBe(2)
    items.forEach((item) => {
      expect(users.find((user) => user === item.innerHTML)).toBe(item.innerHTML)
    })
  })
  it('updates the store when dispatched', () => {
    const activeUsers = [...users, 'Ronaldo']
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    )
    const el = screen.getAllByText('Ronaldo')
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBe(4)
    expect(el.length).toBe(2)

    listItems.forEach((item) => {
      expect(activeUsers.find((user) => item.innerHTML === user)).toBe(item.innerHTML)
    })
  })
})
