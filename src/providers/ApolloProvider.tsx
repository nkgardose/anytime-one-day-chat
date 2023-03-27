import React, { type PropsWithChildren } from 'react'
import { ApolloProvider as Provider } from '@apollo/client'
import client from '../apollo'

const ApolloProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
