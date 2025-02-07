import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const { name, email, organization, message } = await request.json()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'mayusato@diff-shoe.com',
      subject: `お問い合わせ: ${name}様より`,
      html: `
        <h2>お問い合わせ内容</h2>
        <ul>
          <li>お名前: ${name}</li>
          <li>メールアドレス: ${email}</li>
          <li>組織名: ${organization}</li>
        </ul>
        <h3>メッセージ</h3>
        <p>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('メール送信エラーの詳細:', error)
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    )
  }
} 