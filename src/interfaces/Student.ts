export interface Student {
  id: number | string
  school_id: number | string
  surname: string
  other_names: string
  application_number: string
  pin: string
  programme_id: number | string
  programme: string
  status: number | string
  academic_year: string
  phone: string
  hall: string
  fee_receipt: any
  owing_fees: any
  receipt: string
  created_at: string
  updated_at: string
  key: number | string
}

export interface Duplicate {
  application_number: string
  programme_id: number
  academic_year: string
  school_id: number
}
