import { css, type SerializedStyles, type Theme } from '@emotion/react'

const header = (theme: Theme): SerializedStyles => css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  height: 65px;
  width: 100%;
  padding: 0 15px;
`

export default header
