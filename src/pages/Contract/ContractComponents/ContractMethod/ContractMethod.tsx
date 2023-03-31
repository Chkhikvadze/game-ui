import { ReactNode, useContext, useState } from 'react'

import styled, { css } from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Toast from '@l3-lib/ui-core/dist/Toast'

import Tags from '@l3-lib/ui-core/dist/Tags'
import useMintByAdmin from 'pages/Contract/ContractForm/useMintByAdmin'
import { Contract } from 'services/useContractService'
import { useParams } from 'react-router-dom'
import { ToastContext } from 'contexts'

type ContractMethodProps = {
  buttonName: string
  title: string
  description: string
  disabled?: boolean
  extraDetail?: ReactNode
  contract: Contract
}

const ContractMethod = ({
  buttonName,
  title,
  description,
  disabled,
  extraDetail,
  contract,
}: ContractMethodProps) => {
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState('')
  const { handleMint } = useMintByAdmin({ contract })

  const { projectId, contractId } = useParams()

  const handleOnSend = async () => {
    const { collection_id = '' } = contract
    await handleMint({
      project_id: projectId || '',
      collection_id,
      player_id: '3eba594c-0ab3-48f6-a145-8dc12716bb15',
      token_id: 1,
      amount: Number(amount),
    })

    setShow(false)
  }

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
            value='Player'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown
            kind={Dropdown.kind.PRIMARY}
            placeholder='player'
            size={Dropdown.size.SMALL}
            options={[
              {
                label: 'Mirian',
                value: '3eba594c-0ab3-48f6-a145-8dc12716bb15',
              },
            ]}
          />
        </StyledDropdownWrapper>
        <TextField title={'Amount'} value={amount} onChange={(value: string) => setAmount(value)} />
        <StyledDropdownWrapper>
          <Typography
            value='Asset'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown
            kind={Dropdown.kind.PRIMARY}
            placeholder='asset'
            size={Dropdown.size.SMALL}
            options={[
              {
                label: 'Skull Crusher',
                value: '1123',
              },
            ]}
          />
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
          <Button onClick={handleOnSend}>Send</Button>
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
