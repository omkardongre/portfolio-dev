import { GoogleGenerativeAI } from '@google/generative-ai'
import portfolioData from '../knowledge/portfolio-data.json'

export const runtime = 'edge'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// Resume data inline
const resumeData = `# OMKAR DONGRE
SOFTWARE ENGINEER | FULL-STACK DEVELOPER

Pune, India | omkardongre5@gmail.com

## PROFILE
Software Engineer with 2.5+ years building distributed systems and full-stack applications. Specialized in Go/C++ backend development with hands-on experience in network security, protocol optimization, and database systems.

## TECHNICAL SKILLS
Go, TypeScript, React, C, C++, Python, JavaScript, Next.js, Docker, AWS, Microservices, RESTful APIs

## PROFESSIONAL EXPERIENCE
### Data Plane Team Engineer, Sandvine Networks (2021 — 2023)
- Designed centralized Go-based microservices for real-time threat detection
- Optimized session context protocol reducing CPU/memory overhead
- Implemented YANG data modeling for network configuration

### Software Engineering Intern, Bentley Systems (2021)
- Led Oracle to MSSQL database migration
- Enhanced automation testing framework
`

export async function POST(req: Request) {
  try {
    const { jobUrl, jobDescription } = await req.json()

    if (!jobUrl && !jobDescription) {
      return new Response(
        JSON.stringify({ error: 'Please provide either a job URL or job description' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fetch job description from URL if provided
    let jobContent = jobDescription || ''
    
    if (jobUrl && !jobDescription) {
      try {
        const response = await fetch(jobUrl)
        const html = await response.text()
        
        // Extract text content (simple extraction, can be improved)
        jobContent = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 5000) // Limit to 5000 chars
      } catch (error) {
        console.error('Error fetching job URL:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch job posting. Please paste the job description instead.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    // Analyze job match using Gemini
    const prompt = `You are a professional recruiter analyzing candidate fit for a job posting.

CANDIDATE PROFILE:
${resumeData}

CANDIDATE SKILLS:
${JSON.stringify(portfolioData.skills, null, 2)}

CANDIDATE PROJECTS:
${JSON.stringify(portfolioData.projects, null, 2)}

JOB POSTING:
${jobContent}

TASK:
Analyze how well Omkar Dongre matches this job posting. Provide:

1. **Match Score** (0-100): Overall fit percentage
2. **Matching Skills**: List skills from the job that Omkar has
3. **Missing Skills**: Skills required but Omkar doesn't have
4. **Relevant Experience**: Specific experiences that align with the job
5. **Recommendation**: Should Omkar apply? (Strong Yes / Yes / Maybe / No)
6. **Key Strengths**: Top 3 strengths for this role
7. **Areas to Highlight**: What to emphasize in application

Format your response as JSON with these exact keys:
{
  "matchScore": number (0-100),
  "recommendation": "Strong Yes" | "Yes" | "Maybe" | "No",
  "matchingSkills": string[],
  "missingSkills": string[],
  "relevantExperience": string[],
  "keyStrengths": string[],
  "areasToHighlight": string[],
  "summary": "Brief 2-3 sentence summary"
}

Be honest and professional. Only return valid JSON, no markdown or extra text.`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Parse JSON response
    let analysis
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      analysis = JSON.parse(cleanText)
    } catch (e) {
      console.error('Failed to parse AI response:', text)
      return new Response(
        JSON.stringify({ error: 'Failed to analyze job posting. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify(analysis), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Job match API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process job match request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
