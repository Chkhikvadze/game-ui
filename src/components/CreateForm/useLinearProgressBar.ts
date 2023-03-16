import { useCallback, useEffect, useRef, useState } from 'react'

const useLinearProgressBar = () => {
  const interval = useRef<ReturnType<typeof setInterval>>()
  const [progress, setProgress] = useState(0)

  const startProgress = useCallback(() => {
    interval.current = setInterval(() => {
      setProgress(prev => {
        const value = prev + 1
        if (value === 100) clearInterval(interval.current)
        return value
      })
    }, 40)
  }, [])

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [])

  return {
    startProgress,
    progress,
  }
}

export default useLinearProgressBar
