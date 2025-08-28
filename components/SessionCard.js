import Link from 'next/link'
import { ExternalLink, Eye } from 'lucide-react'
import CopyButton from './CopyButton'

export default function SessionCard({ session, conferenceSlug }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
          {session.title}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded whitespace-nowrap self-start">
          {session.duration}
        </span>
      </div>
      
      {/* Speaker */}
      <p className="text-gray-700 font-medium mb-3 text-sm md:text-base">
        🎤 {session.speaker}
      </p>
      
      {/* Summary */}
      <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
        {session.summary.substring(0, 150)}...
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {session.tags.map((tag) => (
          <span 
            key={tag}
            className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Actions */}
      <div className="space-y-3">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href={`/sessions/${conferenceSlug}/${session.id}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px]"
          >
            <Eye size={16} />
            View Details
          </Link>
          
          <a 
            href={session.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors touch-manipulation min-h-[44px]"
          >
            <ExternalLink size={16} />
            ▶ YouTube
          </a>
        </div>
        
        {/* Copy Actions */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Quick Copy:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <CopyButton
              text={session.youtubeUrl}
              label="YouTube URL"
              successMessage="YouTube URL copied!"
              size="sm"
              variant="outline"
              className="text-xs"
            />
            <CopyButton
              text={`${session.title} - ${session.youtubeUrl}`}
              label="Title + URL"
              successMessage="Title and URL copied!"
              size="sm"
              variant="outline"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}