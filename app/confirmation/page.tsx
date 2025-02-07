"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { BodyMeasurements } from "@/types/measurements"
import { renderProfessionType } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const [measurements, setMeasurements] = useState<BodyMeasurements | null>(null)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedMeasurements = localStorage.getItem("submittedMeasurements")
    if (storedMeasurements) {
      setMeasurements(JSON.parse(storedMeasurements))
    }
  }, [])

  const handleSendData = async () => {
    if (!measurements) return

    setIsSending(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurements),
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました')
      }

      // 送信完了フラグを設定
      sessionStorage.setItem("isDataSent", "true")
      // 入力データをクリア
      localStorage.removeItem("submittedMeasurements")
      // 完了画面に遷移
      router.push("/complete")
    } catch (error) {
      console.error('送信エラー:', error)
      toast({
        title: "エラー",
        description: "データの送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsSending(false)
    }
  }

  if (!measurements) {
    return <div>Loading...</div>
  }

  const renderFootDetails = (foot: "leftFoot" | "rightFoot") => (
    <div>
      <h3 className="text-lg font-semibold mb-2">{foot === "leftFoot" ? "左足" : "右足"}</h3>
      <ul className="list-disc list-inside pl-4 space-y-1">
        <li>足長: {measurements[foot].length} cm</li>
        <li>足幅: {measurements[foot].width} cm</li>
        <li>足囲: {measurements[foot].circumference} cm</li>
        <li>親指の角度: {measurements[foot].thumbAngle} 度</li>
        <li>小指の角度: {measurements[foot].littleToeAngle} 度</li>
        <li>
          足の状態:
          <ul className="list-disc list-inside pl-4">
            {Object.entries(measurements[foot].condition).map(([key, value]) =>
              key !== "other" && value.checked ? (
                <li key={key}>
                  {key === "numbness"
                    ? "しびれ"
                    : key === "dryness"
                      ? "乾燥"
                      : key === "itching"
                        ? "かゆみ"
                        : key === "discomfort"
                          ? "違和感"
                          : key === "sensoryLoss"
                            ? "感覚麻痺"
                            : key === "pain"
                              ? "痛み"
                              : key}
                  {value.details && `: ${value.details}`}
                </li>
              ) : null,
            )}
            {measurements[foot].condition.other && <li>その他: {measurements[foot].condition.other}</li>}
          </ul>
        </li>
      </ul>
      {measurements[foot].photo && (
        <div className="mt-4">
          <p className="font-semibold">足の写真:</p>
          <Image
            src={measurements[foot].photo || "/placeholder.svg"}
            alt={`${foot === "leftFoot" ? "左足" : "右足"}の写真`}
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  )

  const renderLifestyleDetails = () => (
    <div>
      <h3 className="text-lg font-semibold mb-2">患者さんの生活環境</h3>
      <ul className="list-disc list-inside pl-4 space-y-1">
        <li>
          身体の硬さ:{" "}
          {measurements.bodyStiffness === "soft"
            ? "柔らかい"
            : measurements.bodyStiffness === "medium"
              ? "普通"
              : measurements.bodyStiffness === "stiff"
                ? "硬い"
                : measurements.bodyStiffness}
        </li>
        <li>
          手指の動き:{" "}
          {measurements.fingerMovement === "good"
            ? "良好（つまめる）"
            : measurements.fingerMovement === "limited"
              ? "制限あり"
              : measurements.fingerMovement === "poor"
                ? "不可（つまめない）"
                : measurements.fingerMovement}
        </li>
        <li>杖の使用: {measurements.useOfCane === "yes" ? "使用している" : "使用していない"}</li>
        <li>主な使用場所: {measurements.wearingLocation}</li>
        {measurements.additionalNotes && (
          <li>
            追加情報:
            <p className="whitespace-pre-wrap">{measurements.additionalNotes}</p>
          </li>
        )}
      </ul>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">注文確認</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>患者名:</strong> {measurements.patientName}
              </p>
              <p>
                <strong>処方医名:</strong> {measurements.doctorName}
              </p>
              <p>
                <strong>入力者名:</strong> {measurements.inputterName}
              </p>
              <p>
                <strong>職種:</strong> {renderProfessionType(measurements.healthcareProfessionalType)}
              </p>
              <p>
                <strong>身長:</strong> {measurements.height} cm
              </p>
              <p>
                <strong>体重:</strong> {measurements.weight} kg
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderFootDetails("leftFoot")}
              {renderFootDetails("rightFoot")}
            </div>
            <div className="mt-6">{renderLifestyleDetails()}</div>
            <div className="flex justify-between mt-6">
              <Link href="/">
                <Button variant="outline">修正する</Button>
              </Link>
              <Button 
                onClick={handleSendData} 
                disabled={isSending}
              >
                {isSending ? "送信中..." : "データを送信"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

