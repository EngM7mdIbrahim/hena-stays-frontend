import { Box } from '@mantine/core'
import Lottie from 'react-lottie'

import animationData from '../../../utils/lotties/link.json'

export default function LottieLink() {
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
      <Lottie options={defaultOptions} height={300} width={400} />
    </Box>
  )
}
