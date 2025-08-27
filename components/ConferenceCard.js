import Link from 'next/link'

export default function ConferenceCard({ conference }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {conference.name}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {conference.sessionCount} sessions
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">
        {conference.description}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>📅 {new Date(conference.date).toLocaleDateString()}</span>
        <span>📍 {conference.location}</span>
      </div>
      
      <Link 
        href={`/conferences/${conference.slug}`}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        View Sessions
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}