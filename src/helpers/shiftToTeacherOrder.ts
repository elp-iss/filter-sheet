import { shiftChoiceNumberToChoiceOrder } from './getChoices'
import { extractTeacher } from './getTeacherName'

export const shiftToTeacherOrder = (rows: string[][]): string[][] => {
  const teachers = extractTeacher(rows[0])
  //  第n希望以前の列
  const details = rows.slice(1).map((row) => {
    return row.slice(0, 4)
  })
  const choices = rows.slice(1).map((row) => {
    return shiftChoiceNumberToChoiceOrder(teachers)(row)
  })

  const choiceOrderHeeader = [...Array(choices[0].length)]
    .map((_, i) => i + 1)
    .map((e) => `第${e}希望`)
  const header = [
    'タイムスタンプ',
    '生徒番号',
    'ユーザー名',
    'プラットフォーム',
  ].concat(choiceOrderHeeader)

  const body = details.map((detail, i) => detail.concat(choices[i]))

  return [header].concat(body)
}
