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

export default function EnhancedBodyMeasurementsForm() {
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    patientName: "",
    doctorName: "",
    inputterName: "",
    healthcareProfessionalType: "",
    height: "",
    weight: "",
    rightFoot: initialFootMeasurements,
    leftFoot: initialFootMeasurements,
    bodyStiffness: "",
    fingerMovement: "",
    useOfCane: "",
    wearingLocation: "",
    additionalNotes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const [foot, measurement] = name.split(".")

    setMeasurements((prev) => {
      if (foot === "rightFoot" || foot === "leftFoot") {
        return {
          ...prev,
          [foot]: {
            ...prev[foot as keyof BodyMeasurements],
            [measurement]: value,
          },
        }
      }
      return { ...prev, [name]: value }
    })
  }

  const handleCheckboxChange = (foot: "rightFoot" | "leftFoot", condition: keyof FootCondition) => {
    setMeasurements((prev) => ({
      ...prev,
      [foot]: {
        ...prev[foot],
        condition: {
          ...prev[foot].condition,
          [condition]: {
            ...prev[foot].condition[condition],
            checked: !prev[foot].condition[condition].checked,
          },
        },
      },
    }))
  }

  const handleFootConditionDetailsChange = (
    foot: "rightFoot" | "leftFoot",
    condition: keyof FootCondition,
    details: string,
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      [foot]: {
        ...prev[foot],
        condition: {
          ...prev[foot].condition,
          [condition]: {
            ...prev[foot].condition[condition],
            details,
          },
        },
      },
    }))
  }

  const handleSelectChange = (value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      healthcareProfessionalType: value,
    }))
  }

  const handlePhotoUpload = useCallback((foot: "rightFoot" | "leftFoot", file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setMeasurements((prev) => ({
        ...prev,
        [foot]: {
          ...prev[foot],
          photo: reader.result as string,
        },
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("submittedMeasurements", JSON.stringify(measurements))
    window.location.href = "/confirmation"
  }

  const renderFootMeasurements = (foot: "leftFoot" | "rightFoot") => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">{foot === "leftFoot" ? "左足" : "右足"}</h3>
        <Image
          src={`/images/${foot === "leftFoot" ? "left" : "right"}-foot-diagram.png`}
          alt={`${foot === "leftFoot" ? "左足" : "右足"}の測定箇所`}
          width={100}
          height={100}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div key="length">
          <Label htmlFor={`${foot}.length`}>足長 (cm)</Label>
          <Input
            id={`${foot}.length`}
            name={`${foot}.length`}
            type="number"
            step="0.1"
            min="0"
            placeholder="0.0"
            value={measurements[foot].length}
            onChange={handleInputChange}
            required
          />
        </div>
        <div key="width">
          <Label htmlFor={`${foot}.width`}>足幅 (cm)</Label>
          <Input
            id={`${foot}.width`}
            name={`${foot}.width`}
            type="number"
            min="0"
            placeholder="0"
            value={measurements[foot].width}
            onChange={handleInputChange}
            required
          />
        </div>
        <div key="circumference">
          <Label htmlFor={`${foot}.circumference`}>足囲 (cm)</Label>
          <Input
            id={`${foot}.circumference`}
            name={`${foot}.circumference`}
            type="number"
            min="0"
            placeholder="0"
            value={measurements[foot].circumference}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {["thumbAngle", "littleToeAngle"].map((measurement) => (
          <div key={measurement}>
            <Label htmlFor={`${foot}.${measurement}`}>
              {measurement === "thumbAngle" ? "親指の角度" : "小指の角度"} (度)
            </Label>
            <Input
              id={`${foot}.${measurement}`}
              name={`${foot}.${measurement}`}
              type="number"
              min="0"
              placeholder="0"
              value={measurements[foot][measurement as keyof FootMeasurements]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold">足の状態</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(measurements[foot].condition).map(([key, value]) => {
            if (key === "other") return null
            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${foot}.${key}`}
                    checked={value.checked}
                    onCheckedChange={() => handleCheckboxChange(foot, key as keyof FootCondition)}
                  />
                  <Label htmlFor={`${foot}.${key}`}>
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
                  </Label>
                </div>
                {value.checked && (
                  <Input
                    id={`${foot}.${key}.details`}
                    name={`${foot}.${key}.details`}
                    placeholder="詳細を入力"
                    value={value.details}
                    onChange={(e) => handleFootConditionDetailsChange(foot, key as keyof FootCondition, e.target.value)}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div>
          <Label htmlFor={`${foot}.condition.other`}>その他</Label>
          <Input
            id={`${foot}.condition.other`}
            name={`${foot}.condition.other`}
            value={measurements[foot].condition.other}
            onChange={handleInputChange}
            placeholder="その他の症状"
          />
        </div>
      </div>
      <div>
        <Label htmlFor={`${foot}.photo`}>足の写真</Label>
        <Input
          id={`${foot}.photo`}
          name={`${foot}.photo`}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handlePhotoUpload(foot, file)
            }
          }}
        />
        {measurements[foot].photo && (
          <div className="mt-2">
            <Image
              src={measurements[foot].photo || "/placeholder.svg"}
              alt={`${foot === "leftFoot" ? "左足" : "右足"}の写真`}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">DIFF.3D 発注フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">患者名</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={measurements.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="doctorName">処方医名</Label>
                <Input
                  id="doctorName"
                  name="doctorName"
                  value={measurements.doctorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inputterName">入力者名</Label>
                <Input
                  id="inputterName"
                  name="inputterName"
                  value={measurements.inputterName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="healthcareProfessionalType">職種</Label>
                <Select onValueChange={handleSelectChange} value={measurements.healthcareProfessionalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="職種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">医師</SelectItem>
                    <SelectItem value="nurse">看護師</SelectItem>
                    <SelectItem value="physicalTherapist">理学療法士</SelectItem>
                    <SelectItem value="occupationalTherapist">作業療法士</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">身長 (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  min="0"
                  placeholder="170"
                  value={measurements.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="weight">体重 (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  min="0"
                  placeholder="60"
                  value={measurements.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderFootMeasurements("leftFoot")}
              {renderFootMeasurements("rightFoot")}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">患者さんの生活環境</h3>
              <div>
                <Label htmlFor="bodyStiffness">身体の硬さ</Label>
                <Select
                  onValueChange={(value) => setMeasurements((prev) => ({ ...prev, bodyStiffness: value }))}
                  value={measurements.bodyStiffness}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="身体の硬さを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">柔らかい</SelectItem>
                    <SelectItem value="medium">普通</SelectItem>
                    <SelectItem value="stiff">硬い</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fingerMovement">手指の動き</Label>
                <Select
                  onValueChange={(value) => setMeasurements((prev) => ({ ...prev, fingerMovement: value }))}
                  value={measurements.fingerMovement}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="手指の動きを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">良好（つまめる）</SelectItem>
                    <SelectItem value="limited">制限あり</SelectItem>
                    <SelectItem value="poor">不可（つまめない）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="useOfCane">杖の使用</Label>
                <Select
                  onValueChange={(value) => setMeasurements((prev) => ({ ...prev, useOfCane: value }))}
                  value={measurements.useOfCane}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="杖の使用有無を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">使用している</SelectItem>
                    <SelectItem value="no">使用していない</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="wearingLocation">主な使用場所（素材の検討）</Label>
                <Input
                  id="wearingLocation"
                  name="wearingLocation"
                  value={measurements.wearingLocation}
                  onChange={handleInputChange}
                  placeholder="例：室内、屋外、職場など"
                />
              </div>
              <div>
                <Label htmlFor="additionalNotes">追加情報（自由記述）</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={measurements.additionalNotes}
                  onChange={(e) => setMeasurements((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="その他、患者さんの生活環境や要望などがあればご記入ください"
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              次に進む
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 