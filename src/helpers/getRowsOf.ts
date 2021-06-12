import { PlatformData } from '../platform'

export const getRowsOf =
  (platform: PlatformData) =>
  (sheet: GoogleAppsScript.Spreadsheet.Sheet): string[][] => {
    const header = extractHeader(platform.header)(sheet)
    const body = extractRow(platform.name)(sheet)
    return [header].concat(body)
  }

const extractRow =
  (platform: string) => (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
    const rows = sheet.getRange('A2:BX').getValues()
    const filtered = rows
      .filter((e) => e[3] === platform)
      .map((row) => row.filter(Boolean).map(String))
    return filtered
  }

const extractHeader =
  (detail: string) => (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
    const userDetail = sheet.getRange('A1:D1').getValues()
    const selectDetail = sheet.getRange(detail).getValues()
    return userDetail
      .map((e) => e.concat(selectDetail[0]))
      .map((row) => row.map(String))
      .flat()
  }
