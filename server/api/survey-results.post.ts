const ENDPOINT = 'https://api.airtable.com/v0/appeumZ1Zl4tDSjSb/tbl72iIvbZ9bXpQ4x'

// Column name → answer key in the submitted answers object
const ANSWER_KEYS: Record<string, string> = {
  night_phone_away:     'q1',
  night_phone_bedtime:  'q2',
  night_phone_location: 'q3',
  night_bedtime_ritual: 'q4',
  day_first_touch:      'q5',
  day_phone_morning:    'q6',
  day_morning_ritual:   'q7',
  day_mood_effect:      'q8',
  ritual_relationship:  'q9',
  ritual_distractions:  'q10',
  ritual_ten_minutes:   'q12',
  contact_name:         'contact_name',
  contact_email:        'contact_email',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  const a = body.answers ?? {}

  const fields: Record<string, string> = {
    id:        String(body.id ?? ''),
    timestamp: String(body.timestamp ?? ''),
    ip:        String(ip),
    completed: body.completed ? 'true' : 'false',
  }

  for (const [col, qid] of Object.entries(ANSWER_KEYS)) {
    fields[col] = String(a[qid] ?? '')
  }

  try {
    await $fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: {
        records: [{ fields }],
        performUpsert: { fieldsToMergeOn: ['id'] },
      },
    })
  } catch {
    // fail silently — don't interrupt the user experience
  }

  return { success: true }
})
