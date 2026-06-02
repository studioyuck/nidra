const ENDPOINT = 'https://api.airtable.com/v0/appeumZ1Zl4tDSjSb/tbl72iIvbZ9bXpQ4x'

// Airtable field name → answer key in the submitted answers object
const ANSWER_KEYS: Record<string, string> = {
  'Night: Phone Away Frequency':    'q1',
  'Night: Phone Bedtime Timing':    'q2',
  'Night: Phone Location':          'q3',
  'Night: Bedtime Ritual Frequency':'q4',
  'Day: First Touch':               'q5',
  'Day: Phone Morning Timing':      'q6',
  'Day: Morning Ritual Frequency':  'q7',
  'Day: Mood Effect':               'q8',
  'Ritual Relationship Impact':     'q9',
  'Ritual Distractions':            'q10',
  'Ritual Ten Minutes':             'q12',
  'Contact Name':                   'contact_name',
  'Contact Email':                  'contact_email',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  const a = body.answers ?? {}

  const fields: Record<string, unknown> = {
    'ID':         String(body.id ?? ''),
    'Timestamp':  String(body.timestamp ?? ''),
    'IP Address': String(ip),
    'Completed':  body.completed === true,
  }

  for (const [col, qid] of Object.entries(ANSWER_KEYS)) {
    fields[col] = String(a[qid] ?? '')
  }

  try {
    const result = await $fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: {
        records: [{ fields }],
      },
    })
    return { success: true, airtable: result }
  } catch (err: any) {
    return { success: false, error: err?.message, detail: err?.data }
  }
})
