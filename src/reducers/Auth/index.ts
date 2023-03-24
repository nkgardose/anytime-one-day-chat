import localforage from 'localforage'

export interface AuthState {
  activeUser: string
  users: string[]
}

export enum AuthAction {
  LOGIN
}

interface SetUsernameAction {
  type: typeof AuthAction.LOGIN
  activeUser: string
}

export type AuthActionTypes = SetUsernameAction

export type IAuthReducer = (
  store: AuthState,
  action: AuthActionTypes
) => AuthState

const AuthReducer: IAuthReducer = (store, action) => {
  switch (action.type) {
    case AuthAction.LOGIN:
      void localforage.setItem('user', action.activeUser)
      return {
        ...store,
        activeUser: action.activeUser
      }
    default:
      return { ...store }
  }
}

export default AuthReducer
