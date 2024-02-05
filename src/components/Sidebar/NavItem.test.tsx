import { render, screen } from '@testing-library/react'
import { NavItem } from './NavItem'
import { BarChart } from 'lucide-react'

describe('NavItem component', () => {
  it('renders correctly', () => {
    render(<NavItem title="Dashboard" icon={BarChart} href="/" />)
    expect(screen.getByText('Dashboard')).toBeDefined()
  })
})
