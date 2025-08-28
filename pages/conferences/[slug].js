import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Layout from '../../components/Layout'
import SessionCard from '../../components/SessionCard'
import conferencesData from '../../data/conferences.json'

export default function ConferencePage({ conference, sessions }) {
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

  if (!conference) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Conference Not Found</h1>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={16} />
            Back to Conferences
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Back navigation */}
        <div className="mb-4 md:mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors touch-manipulation min-h-[44px]">
            <ArrowLeft size={16} />
            Back to Conferences
          </Link>
        </div>
        
        {/* Conference header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {conference.name}
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
            {conference.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">📅 {new Date(conference.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-1">📍 {conference.location}</span>
            <span className="flex items-center gap-1">🎯 {conference.sessionCount} sessions</span>
          </div>
        </div>
        
        {/* Sessions header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sessions</h2>
        </div>
        
        {/* Sessions grid */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {sessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              conferenceSlug={conference.slug}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = conferencesData.conferences.map((conference) => ({
    params: { slug: conference.slug }
  }))
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const conference = conferencesData.conferences.find(
    (conf) => conf.slug === params.slug
  )
  
  if (!conference) {
    return {
      notFound: true
    }
  }
  
  // Load sessions for this conference
  const sessionsData = require(`../../data/sessions/${conference.slug}-sessions.json`)
  
  return {
    props: {
      conference,
      sessions: sessionsData.sessions
    }
  }
}