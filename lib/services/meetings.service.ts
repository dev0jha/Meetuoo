import { supabaseAdmin } from '@/lib/supabase/admin'
import { Meeting, Transcript, Summary, MeetingStatus } from '@/types/database.types'

// ── CREATE ─────────────────────────────────────────────────
export async function createMeeting(data: {
  workspace_id: string
  title: string
  audio_url: string
  cloudinary_id: string
  duration_seconds: number
  created_by: string
}): Promise<Meeting> {
  const { data: meeting, error } = await supabaseAdmin
    .from('meetings')
    .insert({ ...data, status: 'pending' })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return meeting
}

// ── READ ───────────────────────────────────────────────────
export async function getMeetingById(id: string): Promise<Meeting | null> {
  const { data, error } = await supabaseAdmin
    .from('meetings')
    .select(`
      *,
      transcripts (*),
      summaries (*)
    `)
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function getMeetingsByWorkspace(
  workspaceId: string
): Promise<Meeting[]> {
  const { data, error } = await supabaseAdmin
    .from('meetings')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

// ── UPDATE STATUS ──────────────────────────────────────────
export async function updateMeetingStatus(
  id: string,
  status: MeetingStatus
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('meetings')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ── TRANSCRIPT ─────────────────────────────────────────────
export async function saveTranscript(data: {
  meeting_id: string
  full_text: string
  segments: object[]
}): Promise<void> {
  const { error } = await supabaseAdmin
    .from('transcripts')
    .insert(data)

  if (error) throw new Error(error.message)
}

// ── SUMMARY ────────────────────────────────────────────────
export async function saveSummary(data: {
  meeting_id: string
  overview: string
  decisions: string[]
  action_items: object[]
  open_questions: string[]
  sentiment: string
  tags: string[]
}): Promise<Summary> {
  const { data: summary, error } = await supabaseAdmin
    .from('summaries')
    .insert(data)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return summary
}

export async function updateSummary(
  id: string,
  updates: Partial<Summary>
): Promise<Summary> {
  const { data, error } = await supabaseAdmin
    .from('summaries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function markEmailSent(meetingId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('summaries')
    .update({ email_sent_at: new Date().toISOString() })
    .eq('meeting_id', meetingId)

  if (error) throw new Error(error.message)
}