import { useEffect } from 'react'
import styled from 'styled-components'
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  CATCHER_TOP,
  DROPPING_SPEED,
  STAGE_WIDTH,
} from '../../../../constants'
import { useCatcher } from '../../../../hooks/useCatcher'
import { useDroppingItem } from '../../../../hooks/useDroppingItem'
import { useInterval } from '../../../../hooks/useInterval'
import useLongPress from '../../../../hooks/useLongPress'
import StyledButton from '../../../styles/StyledButton'
import StyledController from '../../../styles/StyledController'
import DroppingItem from '../../DroppingItem'
import TheCatcher from '../TheCatcher'

const StyledGamePageWrapper = styled.div`
  width: 100%;
`

const GameCanvas = ({
  setPoint,
  gameOver,
}: {
  setPoint: React.Dispatch<React.SetStateAction<number>>
  gameOver: boolean
}) => {
  const [catcher, updateCatcherPos] = useCatcher()
  const [droppingItem, resetDroppingItem, updateItemPos, clearDroppingItem] =
    useDroppingItem()
  useEffect(() => {
    resetDroppingItem()
  }, [])
  const moveCatcher = (direction: number) => {
    updateCatcherPos(direction)
  }
  const move = ({
    key,
  }: React.KeyboardEvent<HTMLDivElement>) => {
    if (gameOver) return
    if (key === ARROW_LEFT) {
      moveCatcher(-1)
    } else if (key === ARROW_RIGHT) {
      moveCatcher(1)
    }
  }
  useInterval(async () => {
    if (!droppingItem) return
    if (droppingItem?.topPos >= CATCHER_TOP) {
      if (
        Math.round(
          Math.abs(catcher.pos - droppingItem.leftPos)
        ) < 30
      ) {
        setPoint((prev) => prev + droppingItem.item.point)
      }
      resetDroppingItem()
    } else {
      updateItemPos()
    }
  }, DROPPING_SPEED)
  useEffect(() => {
    if (gameOver) {
      clearDroppingItem()
    }
  }, [gameOver])
  return (
    <StyledGamePageWrapper
      role='button'
      tabIndex={-1}
      onKeyDown={(e) => move(e)}
    >
      <DroppingItem droppingItem={droppingItem} />
      <TheCatcher catcher={catcher} />
      <StyledController>
        <StyledButton
          {...useLongPress(() => moveCatcher(-1))}
        >
          {'<'}
        </StyledButton>
        <StyledButton
          {...useLongPress(() => moveCatcher(1))}
        >
          {'>'}
        </StyledButton>
      </StyledController>
    </StyledGamePageWrapper>
  )
}
export default GameCanvas
