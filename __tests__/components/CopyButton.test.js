import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CopyButton, { YouTubeCopyButton } from '../../components/CopyButton'

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
})

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('CopyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with correct label', () => {
    render(<CopyButton text="test text" label="Copy Test" />)
    
    expect(screen.getByRole('button', { name: 'Copy copy test' })).toBeInTheDocument()
    expect(screen.getByText('Copy Test')).toBeInTheDocument()
  })

  it('copies text to clipboard when clicked', async () => {
    render(<CopyButton text="test text" label="Copy Test" />)
    
    const button = screen.getByRole('button', { name: 'Copy copy test' })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
    })
  })

  it('shows success state after copying', async () => {
    render(<CopyButton text="test text" label="Copy Test" />)
    
    const button = screen.getByRole('button', { name: 'Copy copy test' })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('applies correct size classes', () => {
    render(<CopyButton text="test" label="Copy" size="lg" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-5', 'py-3', 'text-lg')
  })

  it('applies correct variant classes', () => {
    render(<CopyButton text="test" label="Copy" variant="solid" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-600', 'text-white')
  })

  it('has minimum touch target size', () => {
    render(<CopyButton text="test" label="Copy" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('min-h-[44px]', 'min-w-[44px]')
  })
})

describe('YouTubeCopyButton', () => {
  const mockProps = {
    youtubeUrl: 'https://youtube.com/watch?v=abc123',
    title: 'Test Session',
    speaker: 'John Doe',
    conference: 'Test Conference'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all copy format buttons', () => {
    render(<YouTubeCopyButton {...mockProps} />)
    
    expect(screen.getByRole('button', { name: /copy copy url/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy copy title \+ url/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy copy for notebooklm/i })).toBeInTheDocument()
  })

  it('copies URL format correctly', async () => {
    render(<YouTubeCopyButton {...mockProps} />)
    
    const urlButton = screen.getByRole('button', { name: /copy copy url/i })
    fireEvent.click(urlButton)
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProps.youtubeUrl)
    })
  })

  it('copies title + URL format correctly', async () => {
    render(<YouTubeCopyButton {...mockProps} />)
    
    const titleUrlButton = screen.getByRole('button', { name: /copy copy title \+ url/i })
    fireEvent.click(titleUrlButton)
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `${mockProps.title} - ${mockProps.youtubeUrl}`
      )
    })
  })

  it('copies NotebookLM format correctly', async () => {
    render(<YouTubeCopyButton {...mockProps} />)
    
    const notebookLMButton = screen.getByRole('button', { name: /copy copy for notebooklm/i })
    fireEvent.click(notebookLMButton)
    
    const expectedFormat = `Session: ${mockProps.title}
Speaker: ${mockProps.speaker}
Conference: ${mockProps.conference}
Video: ${mockProps.youtubeUrl}`
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedFormat)
    })
  })
})