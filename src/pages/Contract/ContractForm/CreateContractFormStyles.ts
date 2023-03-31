import styled, { css } from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import MultiStepIndicator from '@l3-lib/ui-core/dist/MultiStepIndicator'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  overflow: hidden;
`
export const StyledForm = styled.form`
  position: relative;
  display: flex;
  justify-content: flex-end;
  min-width: 50vw;
  height: 100%;
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;

  padding: 64px;

  height: 100%;
  width: 100%;
  max-width: 50%;
  max-height: 100vh;
`
export const StyledButtonWrapper = styled.div<{ finish?: boolean }>`
  margin-top: auto;

  opacity: 1;
  transition: opacity 300ms;
  ${props =>
    props.finish &&
    css`
      pointer-events: none;
      opacity: 0;
    `}
`

export const StyledIconButtonWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  padding: 20px;

  z-index: 1;

  display: flex;
  align-items: center;
  gap: 20px;
`

export const StyledFormWrapper = styled.div<{ finish?: boolean }>`
  /* margin-top: auto; */

  opacity: 1;
  transition: opacity 300ms;
  ${props =>
    props.finish &&
    css`
      pointer-events: none;
      opacity: 0;
    `}

  /* max-height: 100vh; */

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 500px;
  gap: 55px;
`
export const StyledEditableHeading = styled(EditableHeading)`
  width: fit-content;
  color: rgba(255, 255, 255, 0.6);
`
export const StyledMultiStepIndicator = styled(MultiStepIndicator)`
  /* width: fit-content;
  height: fit-content; */
  margin-bottom: 0px;
  padding-left: 0px;
`

export const StyledScrollDiv = styled(ScrollContainer)`
  display: flex;
  gap: 16px;

  min-width: 500px;
  max-width: calc(50vw - 125px);
`
export const StyledWizardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const StyledTransitionDiv = styled.div<{ show?: boolean }>`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin-bottom: 0;
  width: 100%;
  transition: max-height 0.3s, opacity 0.3s, overflow 0s;
  ${p =>
    p.show &&
    css`
      max-height: 1000px;
      opacity: 1;
      margin-bottom: 50px;
    `};
`
export const StyledStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`
export const StyledLine = styled.div`
  height: 38px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  width: 0px;

  margin-left: 27px;
`
export const StyledMultiStepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledCodeButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
`
export const StyledIconWrapper = styled.div`
  width: 20px;
`

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
