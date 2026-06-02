const ENDPOINT = 'https://api.airtable.com/v0/appeumZ1Zl4tDSjSb/tbl6z11fTbwjYfSG7'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  try {
    await $fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: {
        records: [{
          fields: {
            timestamp: new Date().toISOString(),
            name:      String(body.name ?? ''),
            email:     String(body.email ?? ''),
            ip:        String(ip),
          },
        }],
      },
    })
  } catch {
    // fail silently
  }

  return { success: true }
})
