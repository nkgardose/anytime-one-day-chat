import localforage from 'localforage'

export interface AuthState {
  activeUser: string
  users: string[]
}

export enum AuthAction {
  LOGIN = 'LOGIN'
}

interface SetUsernameAction {
  type: typeof AuthAction.LOGIN
  activeUser: string
}

export type AuthActionTypes = SetUsernameAction

export type IAuthReducer = (store: AuthState, action: AuthActionTypes) => AuthState

const AuthReducer: IAuthReducer = (store, action) => {
  switch (action.type) {
    case AuthAction.LOGIN: {
      void localforage.setItem('user', action.activeUser)
      const users =
        store.users.find((user) => user === action.activeUser) !== undefined
          ? store.users
          : [...store.users, action.activeUser]
      return {
        ...store,
        activeUser: action.activeUser,
        users
      }
    }
    default:
      return { ...store }
  }
}

export default AuthReducer
