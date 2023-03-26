/** @jsxImportSource @emotion/react */
import React from 'react'
import header from './style'

const Header: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => <nav css={header}>{children}</nav>

export default Header
