import {
  getDesktopFirstDay,
  getDesktopFourthDay,
  getDesktopSecondDay,
  getDesktopThirdDay,
} from './Desktop'
import {
  getPCVRFirstDay,
  getPCVRFourthDay,
  getPCVRSecondDay,
  getPCVRThirdDay,
} from './PCVR'
import {
  getQuestFirstDay,
  getQuestFourthDay,
  getQuestSecondDay,
  getQuestThirdDay,
} from './Quest'
import {
  getQuestDTFirstDay,
  getQuestDTFourthDay,
  getQuestDTSecondDay,
  getQuestDTThirdDay,
} from './QuestDT'
import { createSheetHeader } from './helpers/createSheetHeader'

const app = SpreadsheetApp.getActiveSpreadsheet()
const sheet1 = app.getSheets()[0]
const test = () => {
  app.getSheets().forEach((sheet, i) => {
    if (i > 0) {
      app.deleteSheet(sheet)
    }
  })
  const rows = sheet1.getRange('A1:BX').getValues()

  console.log('1日目抽出中')
  const firstDay = mergePlatforms([
    getQuestFirstDay,
    getQuestDTFirstDay,
    getDesktopFirstDay,
    getPCVRFirstDay,
  ])(rows)

  console.log('2日目抽出中')
  const secondDay = mergePlatforms([
    getQuestSecondDay,
    getQuestDTSecondDay,
    getDesktopSecondDay,
    getPCVRSecondDay,
  ])(rows)

  console.log('3日目抽出中')
  const thirdDay = mergePlatforms([
    getQuestThirdDay,
    getQuestDTThirdDay,
    getDesktopThirdDay,
    getPCVRThirdDay,
  ])(rows)

  console.log('4日目抽出中')
  const fourthDay = mergePlatforms([
    getQuestFourthDay,
    getQuestDTFourthDay,
    getDesktopFourthDay,
    getPCVRFourthDay,
  ])(rows)

  const sheetDatas = [firstDay, secondDay, thirdDay, fourthDay]
  sheetDatas.map(justifyColsLength).forEach((data, i) => {
    const date = `${i + 1}日目`
    console.log(`${date}日目のシート出力中`)
    const sheet = app.insertSheet(`${date}抽出結果`)
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data)
    console.log(`${date}日目のシート出力終了`)
  })
}

type extractFunc = (a: string[][]) => string[][]
const mergePlatforms = (arr: extractFunc[]) => (sheet: string[][]) => {
  const body = arr
    .map((f) => f(sheet))
    .map((e) => e.slice(1))
    .reduce((acc, current) => acc.concat(current))
  const header = createSheetHeader(body)
  return [header].concat(body)
}

const justifyColsLength = (sheet: string[][]) => {
  const headerLength = sheet[0].length
  return sheet.map((rows) => {
    rows.length = headerLength
    return rows.map((e) => (e === undefined ? '' : e))
  })
}

/* eslint @typescript-eslint/no-explicit-any: 0 */
declare let global: any

global.test = () => {
  return test()
}
