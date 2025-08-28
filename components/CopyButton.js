import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export default function CopyButton({ 
  text, 
  label = 'Copy', 
  successMessage, 
  className = '', 
  size = 'sm',
  variant = 'outline' 
}) {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const handleCopy = () => {
    copyToClipboard(text, successMessage)
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  }

  const variantClasses = {
    outline: copied 
      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
    solid: copied 
      ? 'bg-green-600 text-white hover:bg-green-700' 
      : 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: copied 
      ? 'bg-green-50 text-green-700 hover:bg-green-100' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 font-medium rounded-md border transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        touch-manipulation min-h-[44px] min-w-[44px]
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={copied ? 'Copied!' : `Copy ${label.toLowerCase()}`}
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}

// Specialized YouTube copy buttons
export function YouTubeCopyButton({ youtubeUrl, title, speaker, conference }) {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const copyFormats = [
    {
      label: 'Copy URL',
      text: youtubeUrl,
      message: 'YouTube URL copied!'
    },
    {
      label: 'Copy Title + URL',
      text: `${title} - ${youtubeUrl}`,
      message: 'Title and URL copied!'
    },
    {
      label: 'Copy for NotebookLM',
      text: `Session: ${title}
Speaker: ${speaker}
Conference: ${conference}
Video: ${youtubeUrl}`,
      message: 'NotebookLM format copied!'
    }
  ]

  return (
    <div className="flex flex-col gap-2">
      {copyFormats.map((format, index) => (
        <CopyButton
          key={index}
          text={format.text}
          label={format.label}
          successMessage={format.message}
          size="sm"
          variant={index === 0 ? 'solid' : 'outline'}
          className="w-full justify-center"
        />
      ))}
    </div>
  )
}