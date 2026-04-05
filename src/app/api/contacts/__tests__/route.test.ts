import { POST } from '../route'

const mockCreate = jest.fn()
const mockSend = jest.fn()

jest.mock('@/lib/db', () => ({
  prisma: { contact: { create: (...args: unknown[]) => mockCreate(...args) } },
}))

jest.mock('@/lib/email', () => ({
  sendNotification: (...args: unknown[]) => mockSend(...args),
}))

function req(body: object) {
  return new Request('http://localhost/api/contacts', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

beforeEach(() => {
  mockCreate.mockResolvedValue({ id: 'cuid123' })
  mockSend.mockResolvedValue(undefined)
})

describe('POST /api/contacts', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(req({ phone: '5581991644050' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toMatch(/nome/i)
  })

  it('returns 400 when both phone and email are missing', async () => {
    const res = await POST(req({ name: 'Maria' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toMatch(/telefone|e-mail/i)
  })

  it('saves contact and sends notification on valid payload', async () => {
    const res = await POST(req({ name: 'Maria', phone: '5581991644050' }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: 'Maria', phone: '5581991644050' }),
    })
    expect(mockSend).toHaveBeenCalled()
  })

  it('accepts email instead of phone', async () => {
    const res = await POST(req({ name: 'João', email: 'joao@farm.com' }))
    expect(res.status).toBe(200)
  })

  it('returns 500 if db throws', async () => {
    mockCreate.mockRejectedValueOnce(new Error('DB error'))
    const res = await POST(req({ name: 'Maria', phone: '123' }))
    expect(res.status).toBe(500)
  })
})
