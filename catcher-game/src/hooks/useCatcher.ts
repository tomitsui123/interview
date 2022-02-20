import { useState } from 'react'
import { STAGE_WIDTH, MOVE_SPEED, IMAGE_WIDTH } from '../constants'

export interface ICatcher {
  pos: number
}

export const useCatcher = (): [
  ICatcher,
  (pos: number) => void,
] => {
  const [catcher, setCatcher] = useState({
    pos: window.innerWidth / 2,
  })
  const updateCatcherPos = (pos: number) => {
    const halfInnerWidth = window.innerWidth / 2
    const halfGameCanvas = STAGE_WIDTH / 2
    const overBoundary =
      catcher.pos + MOVE_SPEED * pos >
        halfInnerWidth + halfGameCanvas - IMAGE_WIDTH ||
      catcher.pos + MOVE_SPEED * pos <=
        halfInnerWidth - halfGameCanvas
    setCatcher((prev) => ({
      ...prev,
      pos: overBoundary
        ? prev.pos
        : prev.pos + MOVE_SPEED * pos,
    }))
  }
  return [catcher, updateCatcherPos]
}
