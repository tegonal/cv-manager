export const HEX_COLOR_REGEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/**
 * Normalizes a hex color to lowercase `#rrggbb`, as required by `<input type="color">`.
 */
export const toSixDigitHex = (value?: null | string): string => {
  if (!value || !HEX_COLOR_REGEX.test(value)) {
    return '#000000'
  }
  const hex = value.slice(1).toLowerCase()
  return hex.length === 3
    ? `#${hex
        .split('')
        .map((char) => char + char)
        .join('')}`
    : `#${hex}`
}
