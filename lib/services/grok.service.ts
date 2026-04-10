import OpenAI from 'openai'
import { Summary } from '@/types/database.types'
import { SUMMARY_PROMPT } from '@/lib/utils/prompts'

// Grok uses the OpenAI SDK — just change the baseURL
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

type SummaryData = Omit<Summary, 'id' | 'meeting_id' | 'email_sent_at' | 'created_at'>

export async function summarizeMeeting(transcriptText: string): Promise<SummaryData> {
  const response = await grok.chat.completions.create({
    model: 'grok-3-mini',
    messages: [
      { role: 'system', content: SUMMARY_PROMPT },
      { role: 'user', content: transcriptText },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 2000,
  })

  const raw = response.choices[0].message.content ?? '{}'
  const parsed = JSON.parse(raw)

  return {
    overview:       parsed.overview       ?? '',
    decisions:      parsed.decisions      ?? [],
    action_items:   parsed.action_items   ?? [],
    open_questions: parsed.open_questions ?? [],
    sentiment:      parsed.sentiment      ?? 'neutral',
    tags:           parsed.tags           ?? [],
  }
}