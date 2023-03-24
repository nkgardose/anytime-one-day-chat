import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const RouterProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => <BrowserRouter>{children}</BrowserRouter>

export default RouterProvider
