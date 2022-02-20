import { useContext } from 'react'
import {
  CATCHER_TOP,
  IMAGE_WIDTH,
} from '../../../../constants'
import { ICatcher } from '../../../../hooks/useCatcher'
import catcherImg from '../../../../img/boat.png'
import { GameContext } from '../GameContext'

const TheCatcher = ({ catcher }: { catcher: ICatcher }) => {
  // const { catcher } = useContext(GameContext)
  return (
    <img
      style={{
        position: 'absolute',
        left: `${catcher.pos}px`,
        top: CATCHER_TOP,
      }}
      src={catcherImg}
      alt='The catcher'
      width={IMAGE_WIDTH}
    />
  )
}

export default TheCatcher
