export interface FootConditionDetail {
  checked: boolean
  details: string
}

export interface FootCondition {
  numbness: FootConditionDetail
  dryness: FootConditionDetail
  itching: FootConditionDetail
  discomfort: FootConditionDetail
  sensoryLoss: FootConditionDetail
  pain: FootConditionDetail
  other: string
}

export interface FootMeasurements {
  length: string
  width: string
  circumference: string
  thumbAngle: string
  littleToeAngle: string
  condition: FootCondition
  photo: string | null
}

export interface BodyMeasurements {
  patientName: string
  doctorName: string
  inputterName: string
  healthcareProfessionalType: string
  height: string
  weight: string
  rightFoot: FootMeasurements
  leftFoot: FootMeasurements
  bodyStiffness: string
  fingerMovement: string
  useOfCane: string
  wearingLocation: string
  additionalNotes: string
}

