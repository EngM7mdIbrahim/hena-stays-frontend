import { OSEnum } from '@commonTypes'

export function getDeviceType() {
  if (typeof window === 'undefined') return undefined

  const userAgent = navigator.userAgent.toLowerCase()

  if (/windows nt/i.test(userAgent)) {
    return OSEnum.Windows
  }
  if (/macintosh|mac os x/i.test(userAgent)) {
    return OSEnum.MacOS
  }
  if (/linux/i.test(userAgent)) {
    return OSEnum.Linux
  }
  if (/android/i.test(userAgent)) {
    return OSEnum.Android
  }
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return OSEnum.iOS
  }

  return undefined
}
