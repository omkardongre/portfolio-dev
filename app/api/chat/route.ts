import { GoogleGenerativeAI } from '@google/generative-ai'
import { StreamingTextResponse, GoogleGenerativeAIStream } from 'ai'
import portfolioData from '../knowledge/portfolio-data.json'

export const runtime = 'edge'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// Create system prompt with portfolio knowledge
const systemPrompt = `You are an AI assistant for Omkar Dongre's portfolio website. You are helpful, professional, and knowledgeable about Omkar's work.

Your knowledge base:
${JSON.stringify(portfolioData, null, 2)}

Guidelines:
1. Answer questions about Omkar's skills, projects, and experience based on the knowledge base
2. Be professional yet friendly and approachable
3. If asked about something not in the knowledge base, politely say you don't have that specific information
4. Suggest relevant projects when appropriate (e.g., if someone asks about microservices, mention SocialHub)
5. Encourage visitors to contact Omkar for collaborations or opportunities
6. Keep responses concise (2-3 paragraphs max) and engaging
7. Use technical terms when appropriate but explain them if needed
8. Always refer to Omkar in the third person (e.g., "Omkar has expertise in...")

Example responses:
- "What technologies does Omkar know?" → List skills from knowledge base, highlight specialties
- "Tell me about SocialHub" → Describe the project, tech stack, and key features
- "Is Omkar available for work?" → Yes, actively seeking backend/fullstack roles
- "What's Omkar's experience?" → 2+ years at Sandvine and Bentley Systems, C++ and fullstack development

Remember: You represent Omkar professionally. Be helpful, accurate, and encourage meaningful connections.
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    
    // Combine system prompt with user message
    const prompt = `${systemPrompt}\n\nUser: ${lastMessage.content}\n\nAssistant:`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const result = await model.generateContentStream(prompt)

    // Convert to AI SDK stream
    const stream = GoogleGenerativeAIStream(result)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
