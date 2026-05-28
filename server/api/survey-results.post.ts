import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

// Human-readable column headers → answer key in the submitted answers object
const ANSWER_KEYS: Record<string, string> = {
  night_phone_away:      'q1',
  night_phone_bedtime:   'q2',
  night_phone_location:  'q3',
  night_bedtime_ritual:  'q4',
  day_first_touch:       'q5',
  day_phone_morning:     'q6',
  day_morning_ritual:    'q7',
  day_mood_effect:       'q8',
  ritual_relationship:   'q9',
  ritual_distractions:   'q10',
  ritual_improvements:   'q11',
  ritual_ten_minutes:    'q12',
  contact_name:          'contact_name',
  contact_email:         'contact_email',
  age:                   'q13',
  gender:                'q14',
}

const META = ['id', 'timestamp', 'ip', 'completed']
const COLUMNS = [...META, ...Object.keys(ANSWER_KEYS)]

const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  const a = body.answers ?? {}

  const row = COLUMNS.map(col => {
    if (col === 'id')        return q(body.id)
    if (col === 'timestamp') return q(body.timestamp)
    if (col === 'ip')        return q(ip)
    if (col === 'completed') return q(body.completed ? 'true' : 'false')
    return q(a[ANSWER_KEYS[col]])
  }).join(',')

  const csvPath = join(process.cwd(), 'survey-results.csv')
  const header = COLUMNS.join(',')

  // Read existing content, or start fresh
  let lines: string[] = existsSync(csvPath)
    ? readFileSync(csvPath, 'utf8').split('\n').filter(l => l.trim())
    : [header]

  // Ensure header row is correct
  if (lines[0] !== header) lines = [header]

  // Remove any existing row with this UUID so we always keep the latest
  const id = String(body.id ?? '')
  lines = lines.filter((l, i) => i === 0 || !l.includes(`"${id}"`))

  lines.push(row)
  writeFileSync(csvPath, lines.join('\n') + '\n')

  return { success: true }
})
