import { useMediaQuery } from '@mantine/hooks'

import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 56.25em)')
  return isDesktop ? <HeaderDesktop /> : <HeaderMobile />
}
