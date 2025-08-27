import Link from 'next/link'

export default function SessionCard({ session, conferenceSlug }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {session.title}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap ml-2">
          {session.duration}
        </span>
      </div>
      
      <p className="text-gray-700 font-medium mb-3">
        🎤 {session.speaker}
      </p>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {session.summary.substring(0, 150)}...
      </p>
      
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
      
      <div className="flex gap-3">
        <Link 
          href={`/sessions/${conferenceSlug}/${session.id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
        
        <a 
          href={session.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          ▶ YouTube
        </a>
      </div>
    </div>
  )
}