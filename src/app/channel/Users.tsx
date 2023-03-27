/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useRef, type ChangeEventHandler } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'
import Header from '../../components/header'
import useStore from '../../hooks/useStore'
import { AuthAction } from '../../reducers/Auth'
import { users, header, dropdownIcon } from './style'

const Users: React.FunctionComponent = () => {
  const select = useRef<HTMLSelectElement>(null)
  const { store, dispatch } = useStore()
  const theme = useTheme()

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch({
      type: AuthAction.LOGIN,
      activeUser: event.target.value
    })
  }

  return (
    <Header>
      <div css={header}>
        <select ref={select} onChange={onChange} css={users(theme)} value={store.auth?.activeUser}>
          {store.auth?.users.map((user) => (
            <option key={user}>{user}</option>
          ))}
        </select>
        <i aria-label="Dropdown" css={dropdownIcon}>
          <MdOutlineExpandMore />
        </i>
      </div>
    </Header>
  )
}

export default Users
