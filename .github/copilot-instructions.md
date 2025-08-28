# GitHub Copilot Instructions for Con Website

This document provides context and guidelines for GitHub Copilot when working on the Con Website project.

## Project Overview

**Con Website** is a static Next.js application for displaying AI conference content optimized for NotebookLM processing. It's part of a dual-repository ecosystem:

- **con-website** (this repo): Static display site
- **con-desktop**: Electron app for content management

## Architecture Context

### Tech Stack
- **Framework**: Next.js with static export
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Data**: JSON files (no database)
- **Deployment**: Static hosting (Vercel/Netlify)

### Key Design Decisions
1. **Static-first approach**: All pages pre-rendered for performance
2. **File-based routing**: Leverages Next.js conventions
3. **JSON data storage**: Simple, version-controllable, desktop-app friendly
4. **Component composition**: Reusable, testable components

## Code Patterns & Conventions

### File Naming
- Components: `PascalCase.js` (e.g., `ConferenceCard.js`)
- Pages: `camelCase.js` or `[param].js` for dynamic routes
- Data files: `kebab-case.json` (e.g., `ai-conf-2024-sessions.json`)

### Component Structure
```javascript
// Preferred component pattern
import PropTypes from 'prop-types'

export default function ComponentName({ prop1, prop2 }) {
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  )
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.object
}
```

### Data Loading Pattern
```javascript
// Pages should use getStaticProps for data loading
export async function getStaticProps({ params }) {
  // Load data from JSON files
  const data = await import(`../data/${params.slug}.json`)
  
  return {
    props: {
      data: data.default
    }
  }
}

// Dynamic routes need getStaticPaths
export async function getStaticPaths() {
  // Generate all possible paths
  return {
    paths: [...],
    fallback: false
  }
}
```

## Data Schema Context

### Conference Schema
```json
{
  "id": "unique-slug",
  "name": "Display Name", 
  "slug": "url-friendly-slug",
  "description": "Brief description for cards",
  "date": "YYYY-MM-DD",
  "location": "City, State/Country",
  "sessionCount": 3
}
```

### Session Schema
```json
{
  "id": "unique-session-slug",
  "title": "Session Title",
  "speaker": "Speaker Name",
  "youtubeUrl": "https://youtube.com/watch?v=VIDEO_ID",
  "summary": "Copyable summary text for NotebookLM",
  "duration": "XX minutes",
  "tags": ["category", "topic"]
}
```

## Component Guidelines

### ConferenceCard
- Displays conference metadata
- Links to conference detail page
- Should be responsive and accessible

### SessionCard  
- Shows session info with YouTube link
- Includes copyable summary section
- Should handle long titles gracefully

### Layout
- Consistent header/navigation
- Responsive design
- SEO-friendly meta tags

## Testing Guidelines

### Component Tests
- Test rendering with props
- Test user interactions (clicks, navigation)
- Test edge cases (missing data, long text)
- Use React Testing Library patterns

### Integration Tests
- Test full page rendering
- Test data loading (getStaticProps)
- Test navigation between pages

## Common Tasks & Patterns

### Adding a New Conference
1. Add conference object to `data/conferences.json`
2. Create `data/sessions/{conference-slug}-sessions.json`
3. Verify build generates correct routes

### Adding a New Page
1. Create page in `pages/` directory
2. Add `getStaticProps` if data needed
3. Add `getStaticPaths` if dynamic route
4. Update navigation if needed
5. Add corresponding tests

### Styling Guidelines
- Use Tailwind utility classes
- Mobile-first responsive design
- Consistent color scheme (grays, blues)
- Accessible contrast ratios
- Clean, minimal aesthetic

## Performance Considerations

### Static Generation
- All pages should be statically generated
- No client-side API calls
- Optimize images with Next.js Image component
- Minimize bundle size

### SEO Requirements
- Descriptive page titles
- Meta descriptions for conferences/sessions
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic HTML structure

## Integration Points

### Desktop App Integration
The desktop app will:
- Read/write JSON files in `/data`
- Commit changes to trigger rebuilds
- Need consistent data schema

### Future Considerations
- Search functionality hooks
- Analytics integration points
- Content management workflow
- Potential API integration

## Development Workflow

1. **Start with tests**: Write failing test first
2. **Implement feature**: Focus on functionality
3. **Style with Tailwind**: Add responsive styling  
4. **Test manually**: Check in browser
5. **Run test suite**: Ensure no regressions
6. **Check build**: Verify static export works

## Error Handling

- Graceful fallbacks for missing data
- 404 pages for invalid routes  
- User-friendly error messages
- Console warnings for development

## Accessibility Standards

- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Semantic HTML structure
- Alt text for images

---

**Remember**: This is a content-focused application where user experience and data integrity are paramount. Prioritize clear information architecture and reliable static generation.