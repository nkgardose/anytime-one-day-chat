import React from 'react'
import { ThemeProvider as Theme } from '@emotion/react'
import theme from '../style/theme'

const ThemeProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => <Theme theme={theme}>{children}</Theme>

export default ThemeProvider
