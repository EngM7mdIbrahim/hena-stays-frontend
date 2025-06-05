import { Box } from '@mantine/core'
import Lottie from 'react-lottie'

import animationData from '../../../utils/lotties/success.json'

export default function LottieSuccess() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Box>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  )
}
