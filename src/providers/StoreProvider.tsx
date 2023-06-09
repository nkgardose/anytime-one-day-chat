import React, { createContext, useMemo, useReducer } from 'react'
import AuthReducer, { type AuthActionTypes, type AuthState } from '../reducers/Auth'
import MessagesReducer, { type MessagesActionType, type MessagesState } from '../reducers/Messages'
import { users } from '../utils/constants'

/**
 * Reducers
 */

type Reducers = React.Reducer<AuthState, AuthActionTypes> | React.Reducer<MessagesState, MessagesActionType>

/**
 * Dispatch & Action
 */

type Action = AuthActionTypes | MessagesActionType

type StoreDispatch = React.Dispatch<Action>

/**
 * Store State
 */

interface Store extends Record<string, any> {
  auth?: AuthState
  messages?: MessagesState
}

/**
 * Context & Providers
 */

export interface IStoreContext {
  store: Store
  dispatch: StoreDispatch
}

interface IStoreProvider extends React.PropsWithChildren {
  defaultStore?: Store
}

const initialState: Store = {
  auth: {
    users,
    activeUser: users[0]
  },
  messages: {}
}

export const StoreContext = createContext<IStoreContext>({
  store: initialState,
  dispatch: () => {}
})

const combineReducer = (reducers: Record<keyof Store, Reducers>) => (store: Store, action: Action & any) =>
  Object.keys(reducers).reduce(
    (accumulatedStore, currentReducerKey) => ({
      ...accumulatedStore,
      [currentReducerKey]: reducers[currentReducerKey](accumulatedStore[currentReducerKey], action)
    }),
    store
  )

const StoreProvider: React.FunctionComponent<IStoreProvider> = ({ defaultStore, children }) => {
  const [state, dispatch] = useReducer(
    combineReducer({ auth: AuthReducer, messages: MessagesReducer }),
    defaultStore ?? initialState
  )

  const store = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <StoreContext.Provider value={{ store: store.state, dispatch: store.dispatch }}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider
