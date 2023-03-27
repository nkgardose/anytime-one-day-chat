import { fireEvent, render, screen } from '@testing-library/react'
import Providers from '../../providers'
import Channel from '../channel'
import '@testing-library/jest-dom'

describe('Channel', () => {
  const channels = ['General', 'Technology', 'LGTM']
  it('renders properly', () => {
    const { container } = render(
      <Providers>
        <Channel channels={channels} />
      </Providers>
    )

    expect(container).toMatchSnapshot()
  })
  it('renders the correct content', () => {
    render(
      <Providers>
        <Channel channels={channels} />
      </Providers>
    )

    expect(screen.getByText('Joyse')).toBeInTheDocument()
    expect(screen.getByText('General Channel')).toBeInTheDocument()
    expect(screen.getByText('Technology Channel')).toBeInTheDocument()
    expect(screen.getByText('LGTM Channel')).toBeInTheDocument()
  })
  it('changes the user on select', () => {
    render(
      <Providers>
        <Channel channels={channels} />
      </Providers>
    )

    fireEvent.click(screen.getByText('Joyse'))

    fireEvent.click(screen.getByText('Russell'))

    const select: HTMLSelectElement = screen.getByText('Russell')

    expect(select).toBeInTheDocument()
    expect(select.value).toBe('Russell')
  })
  it('changes the active channel', () => {
    render(
      <Providers>
        <Channel channels={channels} />
      </Providers>
    )

    const anchorElements = screen.getAllByRole('link')

    expect(anchorElements.length).toBe(channels.length)
    expect(global.window.location.pathname).toBe('/')

    channels.forEach((channel, i) => {
      const currentAnchor = anchorElements[i]
      fireEvent.click(currentAnchor)
      expect(currentAnchor.closest('li')).toHaveStyle(
        'background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff) !important;'
      )
      expect(global.window.location.pathname).toBe(`/chat/${channel}`)
    })
  })
})
