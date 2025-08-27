import { render, screen } from '@testing-library/react'
import Layout from '../../components/Layout'

describe('Layout', () => {
  it('renders navigation and footer', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    expect(screen.getByRole('link', { name: 'Con' })).toBeInTheDocument()
    expect(screen.getByText('AI Conference Content')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByText(/Con - AI Conference Content optimized for NotebookLM processing/)).toBeInTheDocument()
  })

  it('home link has correct href', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    const homeLink = screen.getByRole('link', { name: 'Con' })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})