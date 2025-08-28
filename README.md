# Con Website

Static Next.js website for displaying AI conference content optimized for NotebookLM processing.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run export       # Generate static export
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## 🏗️ Project Structure

```
con-website/
├── components/           # Reusable React components
│   ├── ConferenceCard.js # Conference display card
│   ├── Layout.js        # Main layout wrapper
│   └── SessionCard.js   # Session display card
├── data/                # JSON data files
│   ├── conferences.json # Conference metadata
│   └── sessions/        # Session data by conference
├── pages/               # Next.js file-based routing
│   ├── index.js        # Conference list homepage
│   ├── conferences/    # Conference detail pages
│   └── sessions/       # Session detail pages
├── __tests__/          # Jest test files
└── styles/             # Global CSS and Tailwind
```

## 🔄 Data Flow & Architecture

1. **Static Data**: JSON files in `/data` directory
2. **Build Time**: Next.js reads data during `getStaticProps`
3. **Static Generation**: Pre-renders all pages for fast loading
4. **Navigation**: Client-side routing for seamless UX

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## 🌐 Deployment

This site uses Next.js static export for deployment to any static hosting:

```bash
npm run build    # Build the application
npm run export   # Generate static files in /out
```

Deploy the `/out` directory to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static host

## 🔧 Development Workflow

### With GitHub Copilot
This project is optimized for GitHub Copilot assistance:

1. **Clear component structure** for better code suggestions
2. **Descriptive file names** and function names
3. **Consistent coding patterns** throughout the project
4. **Well-documented data schemas** for accurate completions

### Making Changes
1. Run tests: `npm test`
2. Check linting: `npm run lint`
3. Test build: `npm run build`
4. Create PR for review

## 📊 Data Schema

### Conference Object
```json
{
  "id": "conference-slug",
  "name": "Conference Name",
  "slug": "conference-slug", 
  "description": "Brief description",
  "date": "2024-06-15",
  "location": "City, State",
  "sessionCount": 3
}
```

### Session Object
```json
{
  "id": "session-slug",
  "title": "Session Title",
  "speaker": "Speaker Name",
  "youtubeUrl": "https://youtube.com/watch?v=...",
  "summary": "Detailed session summary...",
  "duration": "45 minutes",
  "tags": ["tag1", "tag2"]
}
```

## 🔗 Related Repositories

- [con-desktop](https://github.com/musselmanjoey/con-desktop) - Electron desktop app for content management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run the full test suite
5. Submit a pull request

## 📄 License

This project is part of the Con ecosystem for AI conference content curation.