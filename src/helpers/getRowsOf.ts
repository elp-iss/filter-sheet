import { Header, PlatformData } from '../platform'

export const getRowsOf =
  (platform: PlatformData) =>
  (sheet: string[][]): string[][] => {
    const header = extractHeader(platform.header)(sheet)
    const body = extractRow(platform.name)(sheet)
    return [header].concat(body)
  }

const extractRow = (platform: string) => (sheet: string[][]) => {
  const rows = sheet.slice(1)
  const filtered = rows
    .filter((e) => e[3] === platform)
    .map((row) => row.filter(Boolean).map(String))
  return filtered
}

const extractHeader = (detail: Header) => (sheet: string[][]) => {
  const userDetail = sheet[0].slice(0, 4)
  const selectDetail = sheet[0].slice(detail.start, detail.end + 1)
  return userDetail.concat(selectDetail)
}
