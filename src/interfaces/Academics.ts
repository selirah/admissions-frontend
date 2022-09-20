export interface Course {
  id?: number
  school_id?: number
  course_code: string
  course: string
  created_at?: string
  updated_at?: string
}

export interface Academics {
  id: number
  school_id: number
  result_id: string
  index_no: string
  programme_id: string
  course_code: string
  total: number
  grade: string
  year: string
  semester: string
  created_at: string
  updated_at: string
  course: string
  programme: string
  surname: string
  other_names: string
  owing_fees: number
  phone: string
}

export interface CoursePayload {
  school_id: number | string
  courses: Course[]
}

export interface Re {
  index_no: string
  total: number
  grade: string
}

export interface AcademicsPayload {
  programme_id: number | string
  semester: number | string
  year: number | string
  course_code: string
  school_id: number | string
  results: Re[]
}

export interface Results {
  id: number
  school_id: number
  programme_id: number
  course_code: string
  semester: string
  year: string
  published: number
  created_at: string
  updated_at: string
  programme: string
  course: string
}

export interface Std {
  index_no: string
  surname: string
  other_names: number
  phone: string
}
export interface StudentsPayload {
  programme_id: number | string
  academic_year: number | string
  school_id: number | string
  students: Std[]
}
