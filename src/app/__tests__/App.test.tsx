import { render } from '@testing-library/react'
import App from '..'
import Providers from '../../providers'

describe('App', () => {
  it('renders properly', () => {
    const { container } = render(
      <Providers>
        <App />
      </Providers>
    )

    expect(container).toMatchSnapshot()
  })
})
