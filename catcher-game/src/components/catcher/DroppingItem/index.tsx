import {
  IMAGE_WIDTH,
} from '../../../constants'
import { IDroppingItem } from '../../../hooks/useDroppingItem'

const DroppingItem = ({
  droppingItem,
}: {
  droppingItem: IDroppingItem | null
}) => {
  if (!droppingItem) return <div></div>
  return (
    <div>
      <img
        width={IMAGE_WIDTH}
        style={{
          position: 'absolute',
          left: droppingItem.leftPos,
          top: droppingItem.topPos,
        }}
        src={droppingItem.item.img}
        alt='Dropping Item'
      />
    </div>
  )
}

export default DroppingItem
