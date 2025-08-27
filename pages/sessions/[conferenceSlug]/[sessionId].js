import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import conferencesData from '../../../data/conferences.json'

export default function SessionPage({ conference, session }) {
  const router = useRouter()
  const [copySuccess, setCopySuccess] = useState(false)
  
  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center">Loading...</div>
      </Layout>
    )
  }

  if (!session || !conference) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Session Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Conferences
          </Link>
        </div>
      </Layout>
    )
  }

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(session.summary)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
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
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Conferences
            </Link>
            <span>›</span>
            <Link 
              href={`/conferences/${conference.slug}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              {conference.name}
            </Link>
            <span>›</span>
            <span className="text-gray-700">{session.title}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {session.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-gray-600 mb-4">
              <span className="flex items-center">
                🎤 <span className="ml-2 font-medium">{session.speaker}</span>
              </span>
              <span className="flex items-center">
                ⏱️ <span className="ml-2">{session.duration}</span>
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
            <div className="mb-8">
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
              <div className="flex gap-3">
                <a 
                  href={session.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  ▶ Watch on YouTube
                </a>
              </div>
            </div>
          )}

          {/* Session Summary */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Session Summary</h2>
              <button
                onClick={handleCopySummary}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  copySuccess
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copySuccess ? (
                  <>
                    ✓ Copied!
                  </>
                ) : (
                  <>
                    📋 Copy Summary
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line select-all">
                {session.summary}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Link 
              href={`/conferences/${conference.slug}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to {conference.name}
            </Link>
            
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm"
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