export interface School {
  id: number | string
  user_id: number | string
  school_name: string
  category_id: number | string
  region: string
  town: string
  email: string
  phone: string
  sender_id: string
  address: string
  logo: string
  letter_signatory: string
  letter_signature: string
  signatory_position: string
  academic_year: string
  fee_payment: number | boolean
  created_at: string
  updated_at: string
}
