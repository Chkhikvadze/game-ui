import styled, { css } from 'styled-components'

import MultiStepIndicator from '@l3-lib/ui-core/dist/MultiStepIndicator'
import ScrollContainer from 'react-indiana-drag-scroll'

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
export const StyledStepDetailWrapper = styled.div`
  padding: 150px 60px;
  padding-bottom: 0px;
  /* height: 100%; */
  width: 100%;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  max-height: 100vh;
`

export const StyledStepDetail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 30px;

  height: 100%;
  width: 100%;

  border-radius: 6px;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const StyledFormWrapper = styled.div<{ finish?: boolean }>`
  margin-top: auto;

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
export const StyledImg = styled.img`
  width: 400px;
  height: 266px;

  mix-blend-mode: screen;
`
export const StyledBigImg = styled.img`
  width: 100%;
  height: 570px;
  mix-blend-mode: screen;
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
  transition: max-height 0.3s, opacity 0.3s, overflow 0s;
  ${p =>
    p.show &&
    css`
      max-height: 800px;
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
export const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`
export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`
export const StyledBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 8px;
`

export const StyledTextFieldWrapper = styled.div`
  width: 80px;
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
export const StyledADetailTransition = styled.div<{ show: boolean }>`
  /* opacity: 0;
  position: absolute;
  margin-bottom: 0;
  transition: opacity 0.3s;
  pointer-events: none; */

  display: none;
  ${p =>
    p.show &&
    css`
      /* opacity: 1;
      pointer-events: unset; */
      display: flex;
      flex-direction: column;
      gap: 20px;
    `};
`
