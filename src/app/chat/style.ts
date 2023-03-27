import { css, type SerializedStyles, type Theme } from '@emotion/react'

const chat = css`
  width: 382px;
  height: 100%;

  @media (min-width: 768px) {
    width: 460px;
  }

  @media (min-width: 1024px) {
    width: 620px;
  }

  @media (min-width: 1280px) {
    width: 740px;
  }
`

export const input = css`
  &:focus {
    outline: none;
  }
  &:empty:focus::before,
  &:empty::before {
    content: attr(placeholder);
    color: #aaa;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  flex: 1;
  white-space: pre-wrap;
  word-break: break-all;
  align-self: center;
  font-size: 14px;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border-radius: 20px;
  padding: 10px;
`

export const messageBox = css`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-end;
  padding: 8px;
`

export const chatBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const send = (theme: Theme): SerializedStyles => css`
  color: ${theme.colors.primary};
  transition: 0.2s;
  padding: 5px 0;
  &:hover {
    cursor: pointer;
    color: ${theme.colors['primary-600']};
  }
  &:active {
    color: ${theme.colors['primary-700']};
  }
`

export const messages = css`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  overflow-y: auto;
`

export const messageBubble = css`
  display: flex;
  align-items: flex-start;
  width: auto;
  max-width: 85%;
  gap: 10px;
  margin-bottom: 8px;
`

export const messageContent = css`
  display: flex;
  flex: 0 1 fit-content;
  align-items: flex-end;
  gap: 5px;
  padding: 8px;
  background: white;
  border-radius: 5px;
  & p {
    font-size: 14px;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  & span {
    color: #999;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
  }
`

export const avatarContainer = css`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  align-self: flex-end;
  width: 40px;
  align-items: center;
  & span {
    font-size: 10px;
    color: #888;
  }
  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`

export const meBubble = css`
  flex-direction: row-reverse;
  margin-left: auto;
`

export const error = css`
  color: red;
`

export const meContent = (theme: Theme): SerializedStyles => css`
  background: ${theme.colors.primary};
  color: white;
  & span {
    color: #ccc;
  }
`

export const observer = css`
  width: 100%;
`

export const button = (theme: Theme): SerializedStyles => css`
  background: ${theme.colors.primary};
  transition: 0.5s;
  margin-bottom: 5px;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font: inherit;
  outline: inherit;
  &:hover {
    cursor: pointer;
    background: ${theme.colors['primary-600']};
  }
  &:active {
    background: ${theme.colors['primary-700']};
  }
`

export default chat
