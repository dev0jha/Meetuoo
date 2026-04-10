import { transcribeAudio }    from '@/lib/services/groq.service'
import { summarizeMeeting }   from '@/lib/services/grok.service'
import {
  updateMeetingStatus,
  saveTranscript,
  saveSummary,
} from '@/lib/services/meetings.service'

export async function runMeetingPipeline(
  meetingId: string,
  audioUrl: string
): Promise<void> {
  console.log(`[Pipeline] Starting for meeting: ${meetingId}`)

  try {
    // 1. Mark as processing
    await updateMeetingStatus(meetingId, 'processing')

    // 2. Transcribe with Groq Whisper (free)
    console.log('[Pipeline] Step 1/3 — Groq Whisper transcription...')
    const { text, segments } = await transcribeAudio(audioUrl)

    // 3. Save transcript
    await saveTranscript({ meeting_id: meetingId, full_text: text, segments })
    console.log('[Pipeline] Step 2/3 — Transcript saved')

    // 4. Summarize with Grok xAI (free)
    console.log('[Pipeline] Step 3/3 — Grok summarization...')
    const summaryData = await summarizeMeeting(text)
    await saveSummary({ meeting_id: meetingId, ...summaryData })

    // 5. Done
    await updateMeetingStatus(meetingId, 'completed')
    console.log(`[Pipeline] Done ✓ meeting: ${meetingId}`)

  } catch (err) {
    console.error(`[Pipeline] Failed for ${meetingId}:`, err)
    await updateMeetingStatus(meetingId, 'failed')
    throw err
  }
}