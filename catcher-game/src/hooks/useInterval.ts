import { useEffect, useRef } from 'react'

const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef<any>()
  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const tick = () => {
      if (savedCallback) {
        savedCallback?.current!()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [callback, delay])
}

export { useInterval }
