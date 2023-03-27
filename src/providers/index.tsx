import RouterProvider from './RouterProvider'
import StoreProvider from './StoreProvider'
import ThemeProvider from './ThemeProvider'

const Providers: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <RouterProvider>
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  </RouterProvider>
)

export default Providers
