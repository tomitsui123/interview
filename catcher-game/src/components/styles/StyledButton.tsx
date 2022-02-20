import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: black;
  border-radius: 12px;
  font-family: 'CursedTimer', 'Open Sans', sans-serif;
  font-size: 40px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  padding: 0.25em 0.5em;
  user-select: none;
  touch-action: manipulation;

  &:hover {
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    color: white;
  }
  
  &:active {
    box-shadow: 0px 0px 0px 0px;
  }
  
`
export default StyledButton