import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, state, message } = body

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 })
    }

    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Informe um telefone ou e-mail para contato.' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        state: state?.trim() || null,
        message: message?.trim() || null,
      },
    })

    await sendNotification(contact)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contacts/route]', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
