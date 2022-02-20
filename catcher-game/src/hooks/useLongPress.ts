import { useState, useEffect, useCallback } from 'react'

export default function useLongPress(
  callback = (e?: React.KeyboardEvent<HTMLDivElement>) => {},
  ms = 24
) {
  const [startLongPress, setStartLongPress] =
    useState(false)

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined
    if (startLongPress) {
      timerId = setTimeout(callback, ms)
    } else {
      if (!timerId) return 
      clearTimeout(timerId)
    }

    return () => {
      if (!timerId) return 
      clearTimeout(timerId)
    }
  }, [callback, ms, startLongPress])

  const start = useCallback(() => {
    setStartLongPress(true)
  }, [])
  const stop = useCallback(() => {
    setStartLongPress(false)
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
