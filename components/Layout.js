import { useState } from 'react'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import MobileNav from './MobileNav'

export default function Layout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Con
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                AI Conference Content
              </div>
            </div>
            
            {/* Mobile navigation */}
            <MobileNav isOpen={mobileNavOpen} setIsOpen={setMobileNavOpen} />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>Con - AI Conference Content optimized for NotebookLM processing</p>
          </div>
        </div>
      </footer>
      
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            padding: '12px 16px',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  )
}