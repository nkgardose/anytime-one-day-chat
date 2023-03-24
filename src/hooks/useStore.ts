import { useContext } from 'react'
import { type IStoreContext, StoreContext } from '../providers/StoreProvider'

const useStore = (): IStoreContext => useContext(StoreContext)

export default useStore
