import { useCallback, useRef } from 'react'

export const useSoundPlay = (soundUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl)
    }

    // Reset the audio to start if it's already playing
    audioRef.current.currentTime = 0
    try {
      audioRef.current.play()
    } catch {
      // Do nothing
    }
  }, [soundUrl])

  return playSound
}
