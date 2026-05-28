import { appendFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  const csvPath = join(process.cwd(), 'waiting-list.csv')

  if (!existsSync(csvPath)) {
    appendFileSync(csvPath, 'timestamp,name,email,ip\n')
  }

  const escape = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`

  const row = [
    new Date().toISOString(),
    escape(body.name),
    escape(body.email),
    ip,
  ].join(',') + '\n'

  appendFileSync(csvPath, row)

  return { success: true }
})
