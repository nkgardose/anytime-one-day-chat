import { css, type Theme, type SerializedStyles } from '@emotion/react'

export const app = (theme: Theme): SerializedStyles => css`
  display: flex;
  width: min-content;
  margin: 0 auto;
  height: 100vh;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};
`
