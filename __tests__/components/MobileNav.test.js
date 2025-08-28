import { render, screen, fireEvent } from '@testing-library/react'
import MobileNav from '../../components/MobileNav'

describe('MobileNav', () => {
  const mockSetIsOpen = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders hamburger menu button when closed', () => {
    render(<MobileNav isOpen={false} setIsOpen={mockSetIsOpen} />)
    
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument()
  })

  it('opens mobile menu when hamburger button is clicked', () => {
    render(<MobileNav isOpen={false} setIsOpen={mockSetIsOpen} />)
    
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(menuButton)
    
    expect(mockSetIsOpen).toHaveBeenCalledWith(true)
  })

  it('renders navigation dialog when open', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument()
  })

  it('renders all navigation links when open', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    expect(screen.getByRole('link', { name: '🏠 All Conferences' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '🤖 AI Conference 2024' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '💻 DevCon 2024' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '🧠 ML Summit 2024' })).toBeInTheDocument()
  })

  it('closes menu when close button is clicked', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    const closeButton = screen.getByRole('button', { name: 'Close panel' })
    fireEvent.click(closeButton)
    
    expect(mockSetIsOpen).toHaveBeenCalledWith(false)
  })

  it('closes menu when navigation link is clicked', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    const homeLink = screen.getByRole('link', { name: '🏠 All Conferences' })
    fireEvent.click(homeLink)
    
    expect(mockSetIsOpen).toHaveBeenCalledWith(false)
  })

  it('has proper navigation links with correct hrefs', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    expect(screen.getByRole('link', { name: '🏠 All Conferences' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: '🤖 AI Conference 2024' })).toHaveAttribute('href', '/conferences/ai-conf-2024')
    expect(screen.getByRole('link', { name: '💻 DevCon 2024' })).toHaveAttribute('href', '/conferences/devcon-2024')
    expect(screen.getByRole('link', { name: '🧠 ML Summit 2024' })).toHaveAttribute('href', '/conferences/ml-summit-2024')
  })

  it('includes description text', () => {
    render(<MobileNav isOpen={true} setIsOpen={mockSetIsOpen} />)
    
    expect(screen.getByText('AI Conference Content optimized for NotebookLM processing')).toBeInTheDocument()
  })
})