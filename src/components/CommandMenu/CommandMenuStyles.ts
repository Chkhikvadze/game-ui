import { Command } from 'cmdk'
import styled from 'styled-components'

const CommandInput = styled(Command.Input)`
  all: unset;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid rgba(0, 0, 0, 0);
  font-weight: 500;
  border-radius: 4px;
  transition: border-color var(--motion-productive-medium) ease-in;
  padding: 8px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff !important;
  color: !important;
  background-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`

const CommandItem = styled(Command.Item)`
  &[aria-selected='true'] {
    background: rgba(255, 255, 255, 0.1);
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      padding: 1px; /* control the border thickness */
      background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      border: none;
    }
  }
  margin-top: 2px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 12px 24px;
  color: #ffffff;
`

const CommandList = styled(Command.List)`
  margin-top: 38px;
`

const CommandWrapper = styled(Command)`
  min-width: 50%;
`

const StyledCommandItemHeader = styled.div<{ marginTop?: any }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  margin-top: ${p => (p.marginTop ? p.marginTop : 0)}px;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`
const StyledSvgContainer = styled.div<{ type?: string }>`
  background: rgba(246, 247, 207, 0.6);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  ${({ type }) =>
    type === 'go_to' &&
    `
  background: rgba(246, 247, 207, 0.6);
  svg{ path { fill: linear-gradient(180deg, #FDFE53 0%, #EB9B3A 100%);; }}
  `}
  ${({ type }) =>
    type === 'create' &&
    `
  background: #1A3140;
  svg{ path { fill: #00AAFF; }}
  
  `}
`

const CommandListInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export {
  CommandInput,
  CommandItem,
  CommandList,
  CommandWrapper,
  StyledCommandItemHeader,
  StyledSvgContainer,
  CommandListInner,
}
