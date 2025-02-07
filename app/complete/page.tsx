"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CompletePage() {
  const router = useRouter()

  useEffect(() => {
    // 直接アクセスを防ぐため、送信完了フラグをチェック
    const isCompleted = sessionStorage.getItem("isDataSent")
    if (!isCompleted) {
      router.replace("/")
    }
  }, [router])

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">送信完了</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="py-8">
              <p className="text-xl mb-4">データを送信しました</p>
              <p className="text-gray-600">
                ご入力いただいた採寸データは正常に送信されました。
                <br />
                担当者より順次ご連絡させていただきます。
              </p>
            </div>
            <div>
              <Link href="/">
                <Button>トップページに戻る</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 