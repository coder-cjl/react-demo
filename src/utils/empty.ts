/// 不知道元素是否为空
export function isEmptyElement(element: HTMLElement | null): boolean {
  return !element || element.children.length === 0
}

/// 判断对象是否为空
export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/// 判断数组是否为空
export function isArrayEmpty(arr: never[]): boolean {
  return arr.length === 0
}

/// 判断字符串是否为空
export function isStringEmpty(str: string): boolean {
  return str.trim().length === 0
}

/// 判断值是否为 null 或 undefined 或者 ""
export function isNullOrUndefined(value: never): boolean {
  return value === null || value === undefined || value === ''
}

/// 判断值是否为有效值（非 null、非 undefined、非 ""）
export function isValidValue(value: never): boolean {
  return !isNullOrUndefined(value)
}
