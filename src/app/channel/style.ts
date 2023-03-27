import { css, type SerializedStyles, type Theme } from '@emotion/react'

export const channel = (theme: Theme): SerializedStyles => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid ${theme.colors.border};
  width: 128px;

  @media (min-width: 768px) {
    width: 230px;
  }

  @media (min-width: 1024px) {
    width: 310px;
  }

  @media (min-width: 1280px) {
    width: 370px;
  }
`

export const channelList = css`
  flex: 1;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const channelItem = css`
  width: 100%;
  height: 60px;
  & a {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 10px 1rem;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    color: black;

    &:hover {
      cursor: pointer;
      background-image: -webkit-linear-gradient(right, #e9eff5, #ffffff);
    }
  }
`

export const active = css`
  & a {
    background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff) !important;
  }
`

export const header = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const users = (theme: Theme): SerializedStyles => css`
  font-size: 16px;
  flex: 1;
  height: 100%;
  -webkit-appearance: none;
  outline: none;
  border: none;
  background: ${theme.colors.background};
  cursor: pointer;
`

export const dropdownIcon = css`
  pointer-events: none;
  position: absolute;
  right: 0;
`
