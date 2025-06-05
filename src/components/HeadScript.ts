'use client'

import { useEffect } from 'react'

interface HeadScriptProps {
  id: string
  content: object
}

export default function HeadScript({ id, content }: HeadScriptProps) {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(content)

    // Append to head
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const existingScript = document.getElementById(id)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [id, content])

  return null
}
