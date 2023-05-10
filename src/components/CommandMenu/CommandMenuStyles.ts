import { Command } from 'cmdk'
import styled from 'styled-components'

const CommandInput = styled(Command.Input)`
  all: unset;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: fit-content;
  height: auto;
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
`

const CommandItem = styled(Command.Item)`
  &[aria-selected='true'] {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-image: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%) 1;
  }
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

export { CommandInput, CommandItem, CommandList }
