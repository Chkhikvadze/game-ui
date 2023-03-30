import { useState } from 'react'

import styled, { css } from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Heading from '@l3-lib/ui-core/dist/Heading'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import DropdownChevronDown from '@l3-lib/ui-core/dist/icons/DropdownChevronDown'
import DropdownChevronUp from '@l3-lib/ui-core/dist/icons/DropdownChevronUp'

const MethodComponent = ({ item }: any) => {
  const [show, setShow] = useState(false)

  return (
    <StyledForm>
      <StyledHeaderWrapper>
        <Heading type={Heading.types.h1} value={item.name} size='medium' customColor={'#FFF'} />
        <IconButton
          icon={show ? DropdownChevronUp : DropdownChevronDown}
          kind={IconButton.kinds.TERTIARY}
          //   size={IconButton.sizes.SMALL}
          onClick={() => {
            setShow(!show)
          }}
        />
      </StyledHeaderWrapper>

      <StyledFormContent show={show}>
        {item.inputs.map((input: any, index: number) => {
          return <TextField key={index} title={input.name} size={TextField.sizes.MEDIUM} />
        })}
      </StyledFormContent>
    </StyledForm>
  )
}

export default MethodComponent

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 32px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`
const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const StyledFormContent = styled.div<{ show: boolean }>`
  display: flex;
  gap: 20px;

  max-height: 0px;
  opacity: 0;
  overflow: hidden;
  margin-top: 0px;
  transition: max-height 0.3s, margin-top 0.3s, opacity 0.3s;
  ${p =>
    p.show &&
    css`
      max-height: 800px;
      opacity: 1;
      /* margin-top: 10px; */
    `};
`
