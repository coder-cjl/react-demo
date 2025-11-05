/// 日期格式化工具
export function formatDate(date: Date, format: string): string {
  const map: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    hh: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0'),
  }

  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, matched => map[matched])
}

/// 获取当前日期的字符串表示
export function getCurrentDateString(): string {
  const now = new Date()
  return formatDate(now, 'YYYY-MM-DD hh:mm:ss')
}

/// 计算两个日期之间的天数差
export function dateDiffInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/// 判断一个年份是否为闰年
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/// 获取一个月的天数
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/// 将时间戳转换为日期对象
export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp)
}

/// 将日期对象转换为时间戳
export function dateToTimestamp(date: Date): number {
  return date.getTime()
}

/// 将时间戳转换为格式化字符串
export function timestampToFormattedString(
  timestamp: number,
  format: string
): string {
  const date = new Date(timestamp)
  return formatDate(date, format)
}

/// 将格式化字符串转换为时间戳
export function formattedStringToTimestamp(dateString: string): number {
  const date = new Date(dateString)
  return date.getTime()
}
