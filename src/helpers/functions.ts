import { Programme } from '../interfaces'

export const getCurrentAcademicYears = () => {
  let currentYear: number
  let nextYear: number

  if (new Date().getMonth() >= 8) {
    // set to september
    currentYear = new Date().getFullYear()
    nextYear = new Date().getFullYear() + 1
  } else {
    currentYear = new Date().getFullYear() - 1
    nextYear = new Date().getFullYear()
  }

  return { currentYear, nextYear }
}

export const getProgramme = (
  programmes: Programme[],
  programmeId: number | string
) => {
  const programme = programmes.find((p) => p.id === programmeId)
  return programme!
}
