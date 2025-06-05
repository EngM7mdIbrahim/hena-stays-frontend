import { Box } from '@mantine/core'
import Lottie from 'react-lottie'

import animationData from '../../../utils/lotties/arrow-bottom.json'

export default function LottieArrowBottom() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Box>
      <Lottie options={defaultOptions} height={60} width={60} />
    </Box>
  )
}
