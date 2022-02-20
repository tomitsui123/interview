import styled from 'styled-components'
import { CATCHER_TOP, CONTROLLER_HEIGHT } from '../../constants'

const StyledController = styled.span`
  position: absolute;
  left: ${window.innerWidth / 2 - 70}px;
  top: ${CATCHER_TOP + CONTROLLER_HEIGHT}px;
`

export default StyledController
