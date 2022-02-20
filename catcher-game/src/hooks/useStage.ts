import { useEffect, useState } from 'react'
import { ICatcher } from './useCatcher'

const useStage = (
  catcher: ICatcher,
  setCatcherPoint: (point: number) => void
): [
  any[],
  number,
  number,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [remainingSecond, setRemainingSecond] = useState(3)
  const [isReadConstruction, setIsReadConstruction] =
    useState(true)
  const [gameOver, setGameOver] = useState(false)
  const droppingItemList: any[] = []
  const score = 0
  useEffect(() => {
    if (!isReadConstruction) return
    let timer = setInterval(() => {
      if (remainingSecond > 0) {
        setRemainingSecond((prev) => prev - 1)
      } else {
        setGameOver(true)
      }
    }, 1000)
    if (gameOver) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [remainingSecond, gameOver, isReadConstruction])
  return [
    droppingItemList,
    score,
    remainingSecond,
    gameOver,
    setIsReadConstruction,
  ]
}
export { useStage }
