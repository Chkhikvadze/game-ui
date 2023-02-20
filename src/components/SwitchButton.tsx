import styled from 'styled-components'
import * as Switch from '@radix-ui/react-switch'
//todo jelo replace proptypes to Interface
//eslint-disable-next-line
import { SwitchProps } from '@radix-ui/react-switch'

const SwitchButton = ({ onCheckedChange, defaultChecked }: SwitchProps) => (
  <StyledSwitch onCheckedChange={onCheckedChange} defaultChecked={defaultChecked}>
    <StyledSwitchThumb />
  </StyledSwitch>
)

export default SwitchButton

const StyledSwitch = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: black;
  border-radius: 45%;
  position: relative;
  box-shadow: 0 2px 10px black;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {
    background-color: black;
  }
`

const StyledSwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 2px black;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px)
  }

,
`
