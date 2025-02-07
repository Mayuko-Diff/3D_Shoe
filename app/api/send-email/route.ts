import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { BodyMeasurements } from '@/types/measurements'

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
    console.log('環境変数:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      // パスワードは安全のためログ出力しない
    })

    const measurements: BodyMeasurements = await request.json()
    console.log('受信データ:', measurements)

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'mayusato@diff-shoe.com',
      subject: `新規採寸データ: ${measurements.patientName}様`,
      html: `
        <h2>採寸データ</h2>
        <h3>基本情報</h3>
        <ul>
          <li>患者名: ${measurements.patientName}</li>
          <li>処方医名: ${measurements.doctorName}</li>
          <li>入力者名: ${measurements.inputterName}</li>
          <li>職種: ${measurements.healthcareProfessionalType}</li>
          <li>身長: ${measurements.height}cm</li>
          <li>体重: ${measurements.weight}kg</li>
        </ul>

        <h3>左足データ</h3>
        <ul>
          <li>足長: ${measurements.leftFoot.length}cm</li>
          <li>足幅: ${measurements.leftFoot.width}cm</li>
          <li>足囲: ${measurements.leftFoot.circumference}cm</li>
          <li>親指の角度: ${measurements.leftFoot.thumbAngle}度</li>
          <li>小指の角度: ${measurements.leftFoot.littleToeAngle}度</li>
        </ul>

        <h3>右足データ</h3>
        <ul>
          <li>足長: ${measurements.rightFoot.length}cm</li>
          <li>足幅: ${measurements.rightFoot.width}cm</li>
          <li>足囲: ${measurements.rightFoot.circumference}cm</li>
          <li>親指の角度: ${measurements.rightFoot.thumbAngle}度</li>
          <li>小指の角度: ${measurements.rightFoot.littleToeAngle}度</li>
        </ul>

        <h3>生活環境情報</h3>
        <ul>
          <li>身体の硬さ: ${measurements.bodyStiffness}</li>
          <li>手指の動き: ${measurements.fingerMovement}</li>
          <li>杖の使用: ${measurements.useOfCane}</li>
          <li>主な使用場所: ${measurements.wearingLocation}</li>
          <li>追加情報: ${measurements.additionalNotes}</li>
        </ul>
      `,
    }

    console.log('メール送信開始')
    await transporter.sendMail(mailOptions)
    console.log('メール送信完了')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('メール送信エラーの詳細:', error)
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    )
  }
} 