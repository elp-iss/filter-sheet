import { compose } from 'ramda'
import { getRowsOf } from '../helpers/getRowsOf'
import { platforms } from '../platform'
import { shiftToTeacherOrder } from '../helpers/shiftToTeacherOrder'
import { extractDays } from '../helpers/extractDays'

const isFirstDay = (index: number) => {
  return index <= 3 || (index > 3 && index <= 8)
}

const isSecondDay = (index: number) => {
  return index <= 3 || (index > 8 && index <= 13)
}

const isThirdDay = (index: number) => {
  return index <= 3 || (index > 13 && index <= 18)
}

const isFourthDay = (index: number) => {
  return index <= 3 || (index > 18 && index <= 23)
}

const extractFirstDay = extractDays(isFirstDay)
const extractSecondDay = extractDays(isSecondDay)
const extractThirdDay = extractDays(isThirdDay)
const extractFourthDay = extractDays(isFourthDay)

export const getPCVRFirstDay = compose(
  shiftToTeacherOrder,
  extractFirstDay,
  getRowsOf(platforms.PCVR)
)

export const getPCVRSecondDay = compose(
  shiftToTeacherOrder,
  extractSecondDay,
  getRowsOf(platforms.PCVR)
)

export const getPCVRThirdDay = compose(
  shiftToTeacherOrder,
  extractThirdDay,
  getRowsOf(platforms.PCVR)
)

export const getPCVRFourthDay = compose(
  shiftToTeacherOrder,
  extractFourthDay,
  getRowsOf(platforms.PCVR)
)
