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

export const getDesktopFirstDay = compose(
  shiftToTeacherOrder,
  extractFirstDay,
  getRowsOf(platforms.Desktop)
)

export const getDesktopSecondDay = compose(
  shiftToTeacherOrder,
  extractSecondDay,
  getRowsOf(platforms.Desktop)
)

export const getDesktopThirdDay = compose(
  shiftToTeacherOrder,
  extractThirdDay,
  getRowsOf(platforms.Desktop)
)

export const getDesktopFourthDay = compose(
  shiftToTeacherOrder,
  extractFourthDay,
  getRowsOf(platforms.Desktop)
)
