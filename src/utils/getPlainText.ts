import { convert } from 'html-to-text'

export function getPlainText(html: string, limit: number = 500) {
  const text = convert(html, {
    selectors: [{ selector: 'img', format: 'skip' }]
  })
  return text.split(' ').slice(0, limit).join(' ')
}
