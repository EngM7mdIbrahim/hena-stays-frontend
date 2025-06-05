import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'

export function Logo() {
  const router = useRouter()
  return (
    <Image
      onClick={() => router.push(navigationLinks.landingPage)}
      className='h-2/3 w-auto cursor-pointer object-fill'
      src={navigationLinks.assets.logo}
      width={120}
      height={60}
      alt='Logo'
    />
  )
}
