import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ConferenceCard({ conference }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          {conference.name}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded self-start">
          {conference.sessionCount} sessions
        </span>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">
        {conference.description}
      </p>
      
      {/* Meta information */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          📅 {new Date(conference.date).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          📍 {conference.location}
        </span>
      </div>
      
      {/* Action button */}
      <Link 
        href={`/conferences/${conference.slug}`}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white text-sm md:text-base font-medium rounded-md hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px]"
      >
        View Sessions
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}