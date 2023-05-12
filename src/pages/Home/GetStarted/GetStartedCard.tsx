import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type GetStartedCardProps = {
  mainText: string
  secondaryText: string
  secondaryTextUnderLine?: boolean
  image: string
  bgColor?: 'purple' | 'orange' | 'blue' | 'red'
  link: string
}

const GetStartedCard = ({
  mainText,
  secondaryText,
  secondaryTextUnderLine = false,
  image,
  bgColor = 'purple',
  link,
}: GetStartedCardProps) => {
  const openNewTabHandler = () => {
    window.open(link, '_blank')
  }

  return (
    <StyledLinkCard onClick={openNewTabHandler} bgColor={bgColor}>
      <StyledTextWrapper>
        <StyledSecondaryTextWrapper underline={secondaryTextUnderLine}>
          <Typography
            value={secondaryText}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </StyledSecondaryTextWrapper>
        <Typography
          value={mainText}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
      </StyledTextWrapper>
      <StyledImg src={image} />
    </StyledLinkCard>
  )
}

export default GetStartedCard

const StyledLinkCard = styled.div<{ bgColor: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 28px 24px 12px;
  gap: 16px;
  isolation: isolate;

  width: 240px;
  height: 83px;
  min-width: 240px;
  min-height: 83px;

  border-radius: 16px;

  cursor: pointer;

  ${p =>
    p.bgColor === 'purple' &&
    css`
      background: linear-gradient(85.93deg, #600f9a 0%, #bd27ef 100%);
    `};
  ${p =>
    p.bgColor === 'orange' &&
    css`
      background: linear-gradient(85.93deg, #ec642b 0%, #f8d147 100%);
    `};
  ${p =>
    p.bgColor === 'blue' &&
    css`
      background: linear-gradient(85.93deg, #3973f5 0%, #57bbea 100%);
    `};
  ${p =>
    p.bgColor === 'red' &&
    css`
      background: linear-gradient(84deg, #ff512f 0%, #dd2476 100%);
    `};
`
const StyledImg = styled.img`
  position: absolute;
  width: 56px;
  height: 62px;
  right: 0px;
  bottom: 0px;

  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px 0px 16px 0px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`
const StyledSecondaryTextWrapper = styled.div<{ underline: boolean }>`
  ${p =>
    p.underline &&
    css`
      text-decoration: underline;
      text-underline-position: under;
      text-underline-offset: 0.1px;
      color: rgba(255, 255, 255, 0.6);
    `};
`
