import Layout from '../components/Layout'
import ConferenceCard from '../components/ConferenceCard'
import conferencesData from '../data/conferences.json'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Conference Content
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and explore AI conference sessions optimized for NotebookLM processing. 
            Browse conferences, view sessions, and access detailed summaries with YouTube links.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {conferencesData.conferences.map((conference) => (
            <ConferenceCard key={conference.id} conference={conference} />
          ))}
        </div>
      </div>
    </Layout>
  )
}