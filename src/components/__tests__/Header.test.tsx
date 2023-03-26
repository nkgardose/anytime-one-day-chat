import { render, screen } from '@testing-library/react'
import Header from '../header'
import '@testing-library/jest-dom'
import Providers from '../../providers'

describe('<Header>', () => {
  it('renders properly', () => {
    const { container } = render(
      <Providers>
        <Header>Header</Header>
      </Providers>
    )
    expect(container).toMatchSnapshot()
  })
  it('renders correct children value', () => {
    render(
      <Providers>
        <Header>LGTM Channel</Header>
      </Providers>
    )

    expect(screen.getByText('LGTM Channel')).toBeInTheDocument()
  })
})
