/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type FormEvent } from 'react'
import { MdSend } from 'react-icons/md'
import { input, messageBox, send } from './style'

interface IMessageInput {
  onChange: (value: string) => void
  sendMessage: () => void
}

export interface IMessageInputHandle {
  clear: () => any
  setValue: (value: string) => any
}

const MessageInput: React.ForwardRefRenderFunction<IMessageInputHandle, IMessageInput> = (
  { onChange, sendMessage },
  ref
) => {
  const messageInput = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const [value, setValue] = useState('')

  const clear = (): void => {
    setValue('')
    if (messageInput.current !== null && messageInput.current !== undefined) messageInput.current.textContent = ''
  }

  useImperativeHandle(
    ref,
    () => ({
      clear,
      setValue: (value) => {
        setValue(value)
        if (messageInput.current !== null && messageInput.current !== undefined)
          messageInput.current.textContent = value
      }
    }),
    []
  )

  useEffect(() => {
    onChange(value)
  }, [value])

  const onInput = (e: FormEvent<HTMLDivElement>): void => {
    if (e.currentTarget.textContent !== null) setValue(e.currentTarget.textContent)
  }

  const onSend = (): void => {
    if (value.length > 0) {
      if (value.trim().length === 0) clear()
      else sendMessage()
    }
  }

  return (
    <div css={messageBox}>
      <div
        ref={messageInput}
        tabIndex={0}
        role="textbox"
        contentEditable
        css={input}
        placeholder="Type a message..."
        onInput={onInput}
        onKeyDown={(event) => {
          if (event.key === 'Enter')
            if (event.shiftKey) document.execCommand('insertLineBreak')
            else {
              event.preventDefault()
              onSend()
            }
        }}
      />
      <i aria-label="send" role="button" tabIndex={0} onKeyDown={onSend} onClick={onSend} css={send(theme)}>
        <MdSend size={25} />
      </i>
    </div>
  )
}

export default forwardRef(MessageInput)
