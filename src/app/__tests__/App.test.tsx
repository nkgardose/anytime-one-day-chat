import { act, fireEvent, render, screen } from '@testing-library/react'
import App from '..'
import Providers from '../../providers'
import '@testing-library/jest-dom'

describe('App', () => {
  it('renders properly', () => {
    const { container } = render(
      <Providers>
        <App />
      </Providers>
    )

    expect(container).toMatchSnapshot()
  })
  it('renders the correct content', () => {
    render(
      <Providers>
        <App />
      </Providers>
    )

    expect(screen.getByText('Joyse')).toBeInTheDocument()
    expect(screen.getByText('General Channel')).toBeInTheDocument()
    expect(screen.getByText('Technology Channel')).toBeInTheDocument()
    expect(screen.getByText('LGTM Channel')).toBeInTheDocument()
  })
  it('navigates to the correct channel', async () => {
    render(
      <Providers>
        <App />
      </Providers>
    )
    await act(async () => {
      fireEvent.click(screen.getByText('General Channel'))
    })

    expect(screen.getAllByText('General Channel').length).toBe(2)
  })
})
