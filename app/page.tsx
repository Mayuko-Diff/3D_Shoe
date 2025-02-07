"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import type React from "react"
import { Textarea } from "@/components/ui/textarea"
import type { BodyMeasurements, FootCondition, FootMeasurements } from "@/types/measurements"
import Link from 'next/link'

const initialFootCondition: FootCondition = {
  numbness: { checked: false, details: "" },
  dryness: { checked: false, details: "" },
  itching: { checked: false, details: "" },
  discomfort: { checked: false, details: "" },
  sensoryLoss: { checked: false, details: "" },
  pain: { checked: false, details: "" },
  other: "",
}

const initialFootMeasurements: FootMeasurements = {
  length: "",
  width: "",
  circumference: "",
  thumbAngle: "",
  littleToeAngle: "",
  condition: initialFootCondition,
  photo: null,
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヘッダー部分 */}
      <div className="bg-blue-600 h-[300px] relative overflow-hidden">
        {/* ロゴ */}
        <div className="absolute top-4 left-4 z-20">
          <Image
            src="/images/logo.png"
            alt="DIFF Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        
        {/* メインコンテンツ */}
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              DIFF.3D 発注ページ
            </h1>
          </div>
          
          {/* 靴の写真 */}
          <div className="w-1/2 flex justify-end items-center hidden md:flex">
            <Image
              src="/images/shoe.png"
              alt="3D Shoe"
              width={400}
              height={300}
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-90 -z-10" />
      </div>

      {/* ボタン部分 */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto space-y-6">
          <Link href="/input" className="w-full block">
            <Button 
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              発注画面へ進む
            </Button>
          </Link>
          <Link href="/contact" className="w-full block">
            <Button 
              variant="outline"
              className="w-full py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              問い合わせ
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

