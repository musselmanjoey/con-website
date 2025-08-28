import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Layout from '../../../components/Layout'
import CopyButton, { YouTubeCopyButton } from '../../../components/CopyButton'
import conferencesData from '../../../data/conferences.json'

export default function SessionPage({ conference, session }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center py-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!session || !conference) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Session Not Found</h1>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={16} />
            Back to Conferences
          </Link>
        </div>
      </Layout>
    )
  }

  // Extract YouTube video ID for embedding
  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = getYouTubeVideoId(session.youtubeUrl)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Conferences
            </Link>
            <span>›</span>
            <Link 
              href={`/conferences/${conference.slug}`} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {conference.name}
            </Link>
            <span>›</span>
            <span className="text-gray-700 line-clamp-1">{session.title}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 lg:p-8">
          {/* Session header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {session.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-gray-600 mb-4">
              <span className="flex items-center gap-2">
                🎤 <span className="font-medium">{session.speaker}</span>
              </span>
              <span className="flex items-center gap-2">
                ⏱️ <span>{session.duration}</span>
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {session.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* YouTube Video Embed */}
          {videoId && (
            <div className="mb-6 md:mb-8">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={session.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* YouTube actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a 
                  href={session.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors touch-manipulation min-h-[44px]"
                >
                  <ExternalLink size={16} />
                  ▶ Watch on YouTube
                </a>
              </div>
              
              {/* Copy options */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Copy Video Link:</h3>
                <YouTubeCopyButton
                  youtubeUrl={session.youtubeUrl}
                  title={session.title}
                  speaker={session.speaker}
                  conference={conference.name}
                />
              </div>
            </div>
          )}

          {/* Session Summary */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Session Summary</h2>
              <CopyButton
                text={session.summary}
                label="Copy Summary"
                successMessage="Summary copied to clipboard!"
                size="sm"
                variant="outline"
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line select-all text-sm md:text-base">
                {session.summary}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-6 border-t">
            <Link 
              href={`/conferences/${conference.slug}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px]"
            >
              <ArrowLeft size={16} />
              Back to {conference.name}
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-4 py-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              All Conferences
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = []
  
  // Generate paths for all sessions across all conferences
  for (const conference of conferencesData.conferences) {
    try {
      const sessionsData = require(`../../../data/sessions/${conference.slug}-sessions.json`)
      for (const session of sessionsData.sessions) {
        paths.push({
          params: {
            conferenceSlug: conference.slug,
            sessionId: session.id
          }
        })
      }
    } catch (error) {
      console.error(`Error loading sessions for ${conference.slug}:`, error)
    }
  }
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { conferenceSlug, sessionId } = params
  
  const conference = conferencesData.conferences.find(
    (conf) => conf.slug === conferenceSlug
  )
  
  if (!conference) {
    return {
      notFound: true
    }
  }
  
  try {
    const sessionsData = require(`../../../data/sessions/${conference.slug}-sessions.json`)
    const session = sessionsData.sessions.find((s) => s.id === sessionId)
    
    if (!session) {
      return {
        notFound: true
      }
    }
    
    return {
      props: {
        conference,
        session
      }
    }
  } catch (error) {
    console.error(`Error loading session data:`, error)
    return {
      notFound: true
    }
  }
}