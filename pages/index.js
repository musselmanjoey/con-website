import Layout from '../components/Layout'
import ConferenceCard from '../components/ConferenceCard'
import conferencesData from '../data/conferences.json'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Conference Content
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and explore AI conference sessions optimized for NotebookLM processing. 
            Browse conferences, view sessions, and access detailed summaries with YouTube links.
          </p>
        </div>
        
        {/* Conference Grid */}
        <div className="space-y-6">
          {conferencesData.conferences.map((conference) => (
            <ConferenceCard key={conference.id} conference={conference} />
          ))}
        </div>
      </div>
    </Layout>
  )
}