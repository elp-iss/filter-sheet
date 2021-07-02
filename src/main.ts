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
const test = async() => {
  const deleteSheets = new Promise<void>((resolve) => {
    console.log('シート削除処理開始')
    app.getSheets().forEach((sheet, i) => {
      if (i > 0) {
        app.deleteSheet(sheet)
      }
    })
    resolve()
  })
  deleteSheets.then(() => console.log('シート削除処理終了'))
  const rows = sheet1.getRange('A1:BX').getValues()

  console.log('データ抽出開始')
  const firstDay = mergePlatforms([
    getQuestFirstDay,
    getQuestDTFirstDay,
    getDesktopFirstDay,
    getPCVRFirstDay,
  ])(rows)

  const secondDay = mergePlatforms([
    getQuestSecondDay,
    getQuestDTSecondDay,
    getDesktopSecondDay,
    getPCVRSecondDay,
  ])(rows)

  const thirdDay = mergePlatforms([
    getQuestThirdDay,
    getQuestDTThirdDay,
    getDesktopThirdDay,
    getPCVRThirdDay,
  ])(rows)

  const fourthDay = mergePlatforms([
    getQuestFourthDay,
    getQuestDTFourthDay,
    getDesktopFourthDay,
    getPCVRFourthDay,
  ])(rows)

  const sheetDatas = await Promise.all([firstDay, secondDay, thirdDay, fourthDay])
  console.log('全抽出終了')
  await Promise.all(sheetDatas.map(justifyColsLength).map((data, i) => {
    return new Promise<string>((resolve) => {
      console.log(`${i + 1}日目のシート出力開始`)
      const date = `${i + 1}日目`
      const sheet = app.insertSheet(`${date}抽出結果`)
      sheet.getRange(1, 1, data.length, data[0].length).setValues(data)
      console.log(`${i + 1}日目のシート出力終了`)
      resolve(`${i + 1}日目のシート出力終了`)
    })
  })).then(() => console.log('全件出力終了'))
}

type extractFunc = (a: string[][]) => string[][]
const mergePlatforms = (arr: extractFunc[]) => (sheet: string[][]): Promise<string[][]> => {
  return new Promise((resolve) => {
    const body = arr
      .map((f) => f(sheet))
      .map((e) => e.slice(1))
      .reduce((acc, current) => acc.concat(current))
    const header = createSheetHeader(body)
    resolve([header].concat(body))
  })
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
