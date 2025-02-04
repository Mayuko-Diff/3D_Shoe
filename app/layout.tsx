import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DIFF.3D 発注フォーム",
  description: "足の測定と生活環境情報を入力するフォーム",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'