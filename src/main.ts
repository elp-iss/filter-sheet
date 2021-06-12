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

  console.log('1日目抽出中')
  const firstDay = mergePlatforms([
    getQuestFirstDay,
    getQuestDTFirstDay,
    getDesktopFirstDay,
    getPCVRFirstDay,
  ])(sheet1)
  const firstSheet = app.insertSheet('1日目抽出結果')
  console.log('1日目出力中')
  firstDay.forEach((row) => firstSheet.appendRow(row))

  console.log('2日目抽出中')
  const secondDay = mergePlatforms([
    getQuestSecondDay,
    getQuestDTSecondDay,
    getDesktopSecondDay,
    getPCVRSecondDay,
  ])(sheet1)
  const secondSheet = app.insertSheet('2日目抽出結果')
  console.log('2日目出力中')
  secondDay.forEach((row) => secondSheet.appendRow(row))

  console.log('3日目抽出中')
  const thirdDay = mergePlatforms([
    getQuestThirdDay,
    getQuestDTThirdDay,
    getDesktopThirdDay,
    getPCVRThirdDay,
  ])(sheet1)
  const thirdSheet = app.insertSheet('3日目抽出結果')
  console.log('3日目出力中')
  thirdDay.forEach((row) => thirdSheet.appendRow(row))

  console.log('4日目抽出中')
  const fourthDay = mergePlatforms([
    getQuestFourthDay,
    getQuestDTFourthDay,
    getDesktopFourthDay,
    getPCVRFourthDay,
  ])(sheet1)
  const fourthSheet = app.insertSheet('4日目抽出結果')
  console.log('4日目出力中')
  fourthDay.forEach((row) => fourthSheet.appendRow(row))
}

type extractFunc = (a: GoogleAppsScript.Spreadsheet.Sheet) => string[][]
const mergePlatforms =
  (arr: extractFunc[]) => (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
    const body = arr
      .map((f) => f(sheet))
      .map((e) => e.slice(1))
      .reduce((acc, current) => acc.concat(current))
    const header = createSheetHeader(body)
    return [header].concat(body)
  }

/* eslint @typescript-eslint/no-explicit-any: 0 */
declare let global: any

global.test = () => {
  return test()
}
