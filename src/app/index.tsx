/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import localforage from 'localforage'
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import useStore from '../hooks/useStore'
import { AuthAction } from '../reducers/Auth'
import { channels, StorageKeys } from '../utils/constants'
import Channel from './channel'
import ChatBox from './chat'
import chat from './chat/style'
import { app } from './style'

const Layout = (): JSX.Element => {
  const theme = useTheme()

  return (
    <div css={app(theme)}>
      <Channel channels={channels} />
      <div css={chat}>
        <Outlet />
      </div>
    </div>
  )
}

const App = (): JSX.Element => {
  const { dispatch } = useStore()

  const getActiveUser = async (): Promise<void> => {
    const activeUser: string | null = await localforage.getItem(StorageKeys.USER)

    if (activeUser !== null)
      dispatch({
        type: AuthAction.LOGIN,
        activeUser
      })
  }

  useEffect(() => {
    void getActiveUser()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<></>} />
        <Route path="/chat/:channel" element={<ChatBox />} />
      </Route>
    </Routes>
  )
}

export default App
