import { render, screen } from '@testing-library/react'
import { Profile } from './Profile'

describe('Profile component', () => {
  it('renders correctly', () => {
    render(<Profile />)
    expect(screen.getByText('Rafael Teles Vital')).toBeDefined()
    expect(screen.getByText('te_teles@hotmail.com')).toBeDefined()
  })
})
