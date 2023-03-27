import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Providers from '../../providers'
import StoreProvider from '../../providers/StoreProvider'
import ThemeProvider from '../../providers/ThemeProvider'
import ChatBox from '../chat'

describe('Channel', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {}
  })
  it('renders properly', () => {
    const { container } = render(
      <Providers>
        <ChatBox />
      </Providers>
    )

    expect(container).toMatchSnapshot()
  })
  it('renders correct content', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <StoreProvider>
            <RouterProvider
              router={createMemoryRouter(
                [
                  {
                    path: '/chat/:channel',
                    element: <ChatBox />
                  }
                ],
                {
                  initialEntries: ['/chat/General'],
                  initialIndex: 0
                }
              )}
            />
          </StoreProvider>
        </ThemeProvider>
      )
    })

    expect(screen.getByText('General Channel')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
  })
  it('updates the contentEditable and sends the message', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <StoreProvider>
            <RouterProvider
              router={createMemoryRouter(
                [
                  {
                    path: '/chat/:channel',
                    element: <ChatBox />
                  }
                ],
                {
                  initialEntries: ['/chat/General'],
                  initialIndex: 0
                }
              )}
            />
          </StoreProvider>
        </ThemeProvider>
      )
    })
    const input = screen.getByPlaceholderText('Type a message...')

    userEvent.click(input)
    await act(async () => {
      userEvent.keyboard('ABC')
    })

    expect(input.textContent).toBe('ABC')

    await act(async () => {
      userEvent.click(screen.getByLabelText('send'))
    })

    expect(input.textContent).toBe('')

    userEvent.click(input)
    await act(async () => {
      userEvent.keyboard('A B C')
    })

    await act(async () => {
      userEvent.type(input, '{enter}')
    })

    expect(input.textContent).toBe('')

    expect(screen.getByText('ABC')).toBeInTheDocument()
    expect(screen.getByText('A B C')).toBeInTheDocument()
    expect(screen.getAllByText('Joyse').length).toBe(1)
  })
})
