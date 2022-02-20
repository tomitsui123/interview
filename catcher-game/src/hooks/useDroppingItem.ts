import { useState } from 'react'
import {
  STAGE_WIDTH,
  IMAGE_WIDTH,
  DROPPING_DISTANCE,
} from '../constants'
import e1Img from '../img/e1.png'
import e2Img from '../img/e2.png'
import p1Img from '../img/p1.png'
import p2Img from '../img/p2.png'
import p3Img from '../img/p3.png'
import p4Img from '../img/p4.png'

const P_POINT = 50
const E_POINT = -100
const INIT_POSITION = 100

interface IItem {
  img: string
  point: number
}

export interface IDroppingItem {
  item: IItem
  topPos: number
  leftPos: number
}
const items: Record<string, IItem> = {
  e1: {
    img: e1Img,
    point: E_POINT,
  },
  e2: {
    img: e2Img,
    point: E_POINT,
  },
  p1: {
    img: p1Img,
    point: P_POINT,
  },
  p2: {
    img: p2Img,
    point: P_POINT,
  },
  p3: {
    img: p3Img,
    point: P_POINT,
  },
  p4: {
    img: p4Img,
    point: P_POINT,
  },
}

const randomItem = () => {
  const keyList = Object.keys(items)
  const random = Math.floor(Math.random() * keyList.length)
  return items[keyList[random] as string]
}

const useDroppingItem = (): [
  IDroppingItem | null,
  () => void,
  () => void,
  () => void
] => {
  const [droppingItem, setDroppingItem] =
    useState<IDroppingItem | null>(null)
  const resetDroppingItem = () => {
    const halfInnerWidth = window.innerWidth / 2
    const halfGameCanvas = STAGE_WIDTH / 2
    const leftBoundary =
      halfInnerWidth - halfGameCanvas + IMAGE_WIDTH
    const rightBoundary =
      halfInnerWidth + halfGameCanvas - IMAGE_WIDTH
    setDroppingItem({
      item: randomItem(),
      leftPos:
        Math.random() * (rightBoundary - leftBoundary) +
        leftBoundary,
      topPos: INIT_POSITION,
    })
  }

  const updateItemPos = () => {
    if (droppingItem && droppingItem.topPos > 0) {
      setDroppingItem((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          topPos: prev.topPos + DROPPING_DISTANCE,
        }
      })
    } else {
      resetDroppingItem()
    }
  }
  const clearDroppingItem = () => {
    setDroppingItem(null)
  }
  return [droppingItem, resetDroppingItem, updateItemPos, clearDroppingItem]
}

export { useDroppingItem }
