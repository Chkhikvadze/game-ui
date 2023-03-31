import { ReactNode, useState } from 'react'

import styled, { css } from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Tags from '@l3-lib/ui-core/dist/Tags'

type ContractMethodProps = {
  buttonName: string
  title: string
  description: string
  disabled?: boolean
  extraDetail?: ReactNode
}

const ContractMethod = ({
  buttonName,
  title,
  description,
  disabled,
  extraDetail,
}: ContractMethodProps) => {
  const [show, setShow] = useState(false)

  return (
    <StyledRoot>
      <StyledView show={show}>
        <Tags label='GAS' color={'gradient_yellow'} size='small' readOnly />
        <StyledTextWrapper>
          <div>
            <Heading type={Heading.types.h1} value={title} customColor={'#FFF'} />
            <Typography
              value={description}
              type={Typography.types.P}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255, 0.8)'}
            />
          </div>
        </StyledTextWrapper>
        {extraDetail}
        <StyledButtonWrapper>
          <Button
            disabled={disabled}
            onClick={() => {
              setShow(true)
            }}
          >
            {buttonName}
          </Button>
        </StyledButtonWrapper>
      </StyledView>
      <StyledEdit show={show}>
        <StyledDropdownWrapper>
          <Typography
            value='Address'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown kind={Dropdown.kind.PRIMARY} placeholder='player' size={Dropdown.size.SMALL} />
        </StyledDropdownWrapper>
        <TextField title={'Amount'} />
        <StyledDropdownWrapper>
          <Typography
            value='Asset'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown kind={Dropdown.kind.PRIMARY} placeholder='asset' size={Dropdown.size.SMALL} />
        </StyledDropdownWrapper>
        <StyledButtonWrapper>
          <Button
            kind={Button.kinds.TERTIARY}
            onClick={() => {
              setShow(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShow(false)
            }}
          >
            Send
          </Button>
        </StyledButtonWrapper>
      </StyledEdit>
    </StyledRoot>
  )
}

export default ContractMethod

const StyledRoot = styled.div`
  position: relative;
  height: 400px;
  width: 330px;

  display: flex;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`
const StyledButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`
const StyledView = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 12px;

  opacity: ${p => p.show && '0'};
`

const StyledEdit = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 12px;

  display: ${p => !p.show && 'none'};
`
const StyledDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 8px;
`
const StyledTextWrapper = styled.div`
  border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
  padding-bottom: 10px;

  width: 100%;
`
