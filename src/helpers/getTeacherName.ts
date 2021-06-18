export const getTeacherName = (text: string): string =>
  text.match(/\[(.+)\]/)[1]
export const extractTeacher = (headerRow: string[]): string[] => {
  return headerRow.slice(4).map(getTeacherName)
}
