import StyledButton from '../../styles/StyledButton'
import './index.css'

const StartButton = ({
  onClick,
}: {
  onClick: () => void
}) => (
  <StyledButton onClick={() => onClick()}>
    start
  </StyledButton>
)

export default StartButton
