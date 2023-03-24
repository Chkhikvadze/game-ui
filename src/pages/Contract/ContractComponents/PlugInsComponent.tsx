import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled, { css } from 'styled-components'
import { useState } from 'react'

type FieldComponentProps = {
  title: string
}

const FieldComponent = ({ title }: FieldComponentProps) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <StyledMainSection>
        <StyledTitleWrapper>
          <StyledArtWork />
          <Typography
            value={title}
            type={Typography.types.P}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
        </StyledTitleWrapper>
        <StyledButtonWrapper>
          <StyledAddWrapper>
            <Typography
              value='Add'
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledAddWrapper>

          <StyledNavigationWrapper onClick={() => setShow(!show)} show={show}>
            <NavigationChevronUp />
          </StyledNavigationWrapper>
        </StyledButtonWrapper>
      </StyledMainSection>

      <StyledTransitionDiv show={show}>
        <Typography
          value='Requires standardized metadata for its tokens. Plus, multiple URIs can be linked to smart contracts – smart contracts do not store the actual metadata.'
          type={Typography.types.P}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
      </StyledTransitionDiv>
    </>
  )
}

const PlugInsComponent = () => {
  return (
    <>
      <div>
        <Heading
          type={Heading.types.h1}
          value='Plug-ins '
          size='medium'
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
      </div>
      <Typography
        value='It’s time to customize your needs. Activate the functions you may need in your contract, and simplify your creation with no-code.'
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />

      <StyledInputsWrapper>
        <FieldComponent title={'Minting'} />
        <FieldComponent title={'Price per asset'} />
        <FieldComponent title={'Max assets per player'} />
        <FieldComponent title={'Max assets per transaction'} />
        <FieldComponent title={'Royalties'} />
        <FieldComponent title={'Royalties Split'} />
        <FieldComponent title={'Whitelist'} />
      </StyledInputsWrapper>
    </>
  )
}

export default PlugInsComponent

const StyledInputsWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const StyledMainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* max-width: 600px;
  min-width: 400px; */
`

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 8px;

  align-items: center;
`
const StyledArtWork = styled.div`
  width: 48px;
  height: 48px;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
`
const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`
const StyledNavigationWrapper = styled.div<{ show: boolean }>`
  color: #fff;

  cursor: pointer;

  rotate: ${p => !p.show && '180deg'};
`
const StyledTransitionDiv = styled.div<{ show: boolean }>`
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.3s, opacity 0.3s;
  ${p =>
    p.show &&
    css`
      height: 60px;

      opacity: 1;
    `};
`
const StyledAddWrapper = styled.div`
  border-radius: 6px;
  padding: 6px 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`
