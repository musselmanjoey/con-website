import { useState } from 'react'
import toast from 'react-hot-toast'

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text, successMessage = 'Copied to clipboard!') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(successMessage)
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
      
      return true
    } catch (err) {
      console.error('Failed to copy text: ', err)
      toast.error('Failed to copy to clipboard')
      return false
    }
  }

  return { copied, copyToClipboard }
}