import ApolloProvider from './ApolloProvider'
import RouterProvider from './RouterProvider'
import StoreProvider from './StoreProvider'
import ThemeProvider from './ThemeProvider'

const Providers: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <ApolloProvider>
    <RouterProvider>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </RouterProvider>
  </ApolloProvider>
)

export default Providers
