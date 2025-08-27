import { render, screen } from '@testing-library/react'
import ConferenceCard from '../../components/ConferenceCard'

const mockConference = {
  id: 'test-conf-2024',
  name: 'Test Conference 2024',
  slug: 'test-conf-2024',
  description: 'A test conference for testing purposes',
  date: '2024-06-15',
  location: 'Test City, TC',
  sessionCount: 3
}

describe('ConferenceCard', () => {
  it('renders conference information correctly', () => {
    render(<ConferenceCard conference={mockConference} />)
    
    expect(screen.getByText('Test Conference 2024')).toBeInTheDocument()
    expect(screen.getByText('A test conference for testing purposes')).toBeInTheDocument()
    expect(screen.getByText('📍 Test City, TC')).toBeInTheDocument()
    expect(screen.getByText('3 sessions')).toBeInTheDocument()
  })

  it('creates correct link to conference sessions', () => {
    render(<ConferenceCard conference={mockConference} />)
    
    const link = screen.getByRole('link', { name: /view sessions/i })
    expect(link).toHaveAttribute('href', '/conferences/test-conf-2024')
  })

  it('formats date correctly', () => {
    render(<ConferenceCard conference={mockConference} />)
    
    expect(screen.getByText('📅 6/15/2024')).toBeInTheDocument()
  })
})