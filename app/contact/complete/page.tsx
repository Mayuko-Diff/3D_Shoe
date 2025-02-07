"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ContactCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // 送信完了フラグをチェック
    const isSubmitted = sessionStorage.getItem("contactSubmitted")
    if (!isSubmitted) {
      // フラグがない場合はトップページにリダイレクト
      router.replace("/")
      return
    }
    // フラグを削除（再アクセス防止）
    sessionStorage.removeItem("contactSubmitted")
  }, [router])

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">送信しました</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="py-8">
              <p className="text-gray-600 text-lg">
                ご入力いただいたお問合せ内容は正常に送信されました。
                <br />
                担当者より順次ご連絡させていただきます。
              </p>
            </div>
            <div>
              <Link href="/">
                <Button className="px-8">トップページに戻る</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 