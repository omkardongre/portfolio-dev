import { GoogleGenerativeAI } from '@google/generative-ai'
import portfolioData from '../knowledge/portfolio-data.json'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// Load resume data
const resumePath = join(process.cwd(), 'app/api/knowledge/resume')
const resumeData = readFileSync(resumePath, 'utf-8')

const systemPrompt = `You are an AI assistant for Omkar Dongre's portfolio website. You are helpful, professional, and knowledgeable about Omkar's work.

Your knowledge base:
${JSON.stringify(portfolioData, null, 2)}

Omkar's Resume:
${resumeData}

Guidelines:
1. Answer questions about Omkar's skills, projects, and experience based on the knowledge base
2. Be professional yet friendly and approachable
3. If asked about something not in the knowledge base, politely say you don't have that specific information
4. Suggest relevant projects when appropriate (e.g., if someone asks about microservices, mention SocialHub)
5. Encourage visitors to contact Omkar for collaborations or opportunities
6. Keep responses concise (2-3 paragraphs max) and engaging
7. Use technical terms when appropriate but explain them if needed
8. Always refer to Omkar in the third person (e.g., "Omkar has expertise in...")

Remember: You represent Omkar professionally. Be helpful, accurate, and encourage meaningful connections.
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const lastMessage = messages[messages.length - 1]
    const prompt = `${systemPrompt}\n\nUser: ${lastMessage.content}\n\nAssistant:`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    const result = await model.generateContentStream(prompt)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
