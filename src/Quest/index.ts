import { compose } from 'ramda'
import { getRowsOf } from '../helpers/getRowsOf'
import { platforms } from '../platform'
import { shiftToTeacherOrder } from '../helpers/shiftToTeacherOrder'
import { extractDays } from '../helpers/extractDays'

const isFirstDay = (index: number) => {
  return index <= 3 || (index > 3 && index <= 6)
}

const isSecondDay = (index: number) => {
  return index <= 3 || (index > 6 && index <= 9)
}

const isThirdDay = (index: number) => {
  return index <= 3 || (index > 9 && index <= 11)
}

const isFourthDay = (index: number) => {
  return index <= 3 || (index > 11 && index <= 13)
}

const extractFirstDay = extractDays(isFirstDay)
const extractSecondDay = extractDays(isSecondDay)
const extractThirdDay = extractDays(isThirdDay)
const extractFourthDay = extractDays(isFourthDay)

export const getQuestFirstDay = compose(
  shiftToTeacherOrder,
  extractFirstDay,
  getRowsOf(platforms.Quest)
)

export const getQuestSecondDay = compose(
  shiftToTeacherOrder,
  extractSecondDay,
  getRowsOf(platforms.Quest)
)

export const getQuestThirdDay = compose(
  shiftToTeacherOrder,
  extractThirdDay,
  getRowsOf(platforms.Quest)
)

export const getQuestFourthDay = compose(
  shiftToTeacherOrder,
  extractFourthDay,
  getRowsOf(platforms.Quest)
)
