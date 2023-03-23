import styled, { css } from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronRight'

type GeneralFormCardProps = {
  title: string
  description: string
  buttonLabel: string
  selected: 'normal' | 'warning' | 'error'
  onClick?: () => void
  progress: { status: 'normal' | 'warning' | 'error'; count: number }
}

const GeneralFormCard = ({
  title,
  description,
  buttonLabel,
  selected,
  onClick,
  progress,
}: GeneralFormCardProps) => {
  return (
    <StyledColumnCard selected={selected} onClick={onClick}>
      <StyledMain>
        <StyledTextWrapper>
          <Typography value={title} type={Typography.types.LABEL} size={Typography.sizes.lg} />
          <Typography
            customColor={'rgba(255, 255, 255, 0.8)'}
            value={description}
            type={Typography.types.P}
            size={Typography.sizes.md}
          />
          {/* <div>
            <Button
              kind={Button.kinds.TERTIARY}
              rightIcon={() => (
                <div style={{ width: '16px', height: '16px', marginLeft: '5px' }}>
                  <NavigationChevronRight />
                </div>
              )}
            >
              <div style={{ borderBottom: '#FFF 1px solid' }}>
                <Typography
                  value={'See more'}
                  type={Typography.types.P}
                  size={Typography.sizes.md}
                />
              </div>
            </Button>
          </div> */}
          <StyledTagsWrapper>
            <Tags
              label='API'
              size='small'
              outlined={true}
              readOnly
              color={'gradient_light_green'}
            />
            <Tags
              label='NoCode'
              size='small'
              outlined={true}
              readOnly
              color={'gradient_light_green'}
            />
          </StyledTagsWrapper>
        </StyledTextWrapper>
        <StyledProgressWrapper>
          <Typography
            customColor={'rgba(255, 255, 255, 0.8)'}
            value={`${progress.count}%`}
            type={Typography.types.P}
            size={Typography.sizes.xss}
          />
          <StyledProgress status={progress.status}></StyledProgress>
        </StyledProgressWrapper>
      </StyledMain>

      <StyledButtonWrapper selected={selected}>
        <Button size={Button.sizes.SMALL}>
          <StyledLabelWrapper>
            <Typography value={buttonLabel} type={Typography.types.P} size={Typography.sizes.sm} />
          </StyledLabelWrapper>
        </Button>
      </StyledButtonWrapper>
    </StyledColumnCard>
  )
}

export default GeneralFormCard

const StyledLabelWrapper = styled.div`
  padding: 0px 22px;
`

const StyledColumnCard = styled.div<{ selected: string }>`
  display: flex;
  flex-direction: column;

  gap: 6px;

  width: 310px;
  padding: 16px;

  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  cursor: ${p => !p.selected && 'pointer'};
  outline: 2px transparent solid;
  outline-color: ${p => p.selected === 'normal' && ' #73fafd'};
  outline-color: ${p => p.selected === 'warning' && ' #FDFE53'};
  outline-color: ${p => p.selected === 'error' && ' #D14485'};
`
const StyledTagsWrapper = styled.div`
  margin-top: 2px;

  display: flex;
  gap: 8px;
`
const StyledButtonWrapper = styled.div<{ selected: string }>`
  display: flex;
  justify-content: flex-end;

  width: 100%;

  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.3s, opacity 0.3s, margin-top 0.3s;
  ${p =>
    p.selected &&
    css`
      height: 40px;
      margin-top: 16px;
      opacity: 1;
    `};
`
const StyledMain = styled.div`
  display: flex;

  justify-content: space-between;
`
const StyledProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  position: relative;

  margin-top: 5px;
  margin-right: 5px;
`

const StyledProgress = styled.div<{ status: string }>`
  position: absolute;

  border-radius: 100px;
  border: 2px solid rgba(255, 255, 255, 0.1);

  width: 38px;
  height: 38px;
  min-width: 36px;
  min-height: 36px;

  ${p =>
    p.status === 'error' &&
    css`
      border-top: 2px solid #d14485;
      border-left: 2px solid #d14485;
      rotate: -45deg;
    `};
  ${p =>
    p.status === 'warning' &&
    css`
      border-top: 2px solid #fdfe53;
      rotate: -45deg;
    `};
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85%;
  gap: 6px;
`
