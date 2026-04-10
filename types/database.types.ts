export type MeetingStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type UserRole = 'admin' | 'editor' | 'viewer'
export type Sentiment = 'positive' | 'neutral' | 'tense'

export interface Workspace {
  id: string
  name: string
  owner_id: string
  invite_code: string
  created_at: string
}

export interface WorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  role: UserRole
  joined_at: string
}

export interface Meeting {
  id: string
  workspace_id: string
  title: string
  audio_url: string | null
  cloudinary_id: string | null
  duration_seconds: number
  status: MeetingStatus
  created_by: string | null
  created_at: string
  // joined relations (when fetched with select)
  transcripts?: Transcript[]
  summaries?: Summary[]
}

export interface TranscriptSegment {
  start: number
  end: number
  text: string
  speaker?: string
}

export interface Transcript {
  id: string
  meeting_id: string
  full_text: string
  segments: TranscriptSegment[]
  created_at: string
}

export interface ActionItem {
  task: string
  owner: string
  due_date: string
}

export interface Summary {
  id: string
  meeting_id: string
  overview: string
  decisions: string[]
  action_items: ActionItem[]
  open_questions: string[]
  sentiment: Sentiment
  tags: string[]
  email_sent_at: string | null
  created_at: string
}

// API response shapes
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface UploadMeetingResponse {
  meeting: Meeting
  message: string
}