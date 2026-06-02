const ENDPOINT = 'https://api.airtable.com/v0/appeumZ1Zl4tDSjSb/tbl6z11fTbwjYfSG7'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  try {
    const result = await $fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: {
        records: [{
          fields: {
            Timestamp:    new Date().toISOString(),
            Name:         String(body.name ?? ''),
            Email:        String(body.email ?? ''),
            'IP Address': String(ip),
          },
        }],
      },
    })
    return { success: true, airtable: result }
  } catch (err: any) {
    return { success: false, error: err?.message, detail: err?.data }
  }
})
