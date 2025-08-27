import { render, screen } from '@testing-library/react'
import SessionCard from '../../components/SessionCard'

const mockSession = {
  id: 'test-session',
  title: 'Test Session Title',
  speaker: 'Dr. Test Speaker',
  youtubeUrl: 'https://youtube.com/watch?v=test123',
  summary: 'This is a test session summary that should be truncated when displayed in the card component. It contains more than 150 characters to test the truncation functionality.',
  duration: '45 minutes',
  tags: ['test', 'session', 'mock']
}

const conferenceSlug = 'test-conf-2024'

describe('SessionCard', () => {
  it('renders session information correctly', () => {
    render(<SessionCard session={mockSession} conferenceSlug={conferenceSlug} />)
    
    expect(screen.getByText('Test Session Title')).toBeInTheDocument()
    expect(screen.getByText('🎤 Dr. Test Speaker')).toBeInTheDocument()
    expect(screen.getByText('45 minutes')).toBeInTheDocument()
  })

  it('displays session tags', () => {
    render(<SessionCard session={mockSession} conferenceSlug={conferenceSlug} />)
    
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('session')).toBeInTheDocument()
    expect(screen.getByText('mock')).toBeInTheDocument()
  })

  it('creates correct links', () => {
    render(<SessionCard session={mockSession} conferenceSlug={conferenceSlug} />)
    
    const detailsLink = screen.getByRole('link', { name: /view details/i })
    expect(detailsLink).toHaveAttribute('href', '/sessions/test-conf-2024/test-session')
    
    const youtubeLink = screen.getByRole('link', { name: /youtube/i })
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/watch?v=test123')
    expect(youtubeLink).toHaveAttribute('target', '_blank')
  })

  it('truncates long summary text', () => {
    render(<SessionCard session={mockSession} conferenceSlug={conferenceSlug} />)
    
    const summaryText = screen.getByText(/this is a test session summary/i)
    expect(summaryText.textContent).toMatch(/\.\.\./)
  })
})