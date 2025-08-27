import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SessionCard from '../../components/SessionCard'
import conferencesData from '../../data/conferences.json'

export default function ConferencePage({ conference, sessions }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center">Loading...</div>
      </Layout>
    )
  }

  if (!conference) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Conference Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Conferences
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Conferences
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {conference.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {conference.description}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <span>📅 {new Date(conference.date).toLocaleDateString()}</span>
              <span>📍 {conference.location}</span>
              <span>🎯 {conference.sessionCount} sessions</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sessions</h2>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
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