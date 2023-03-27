import { useState, useContext } from 'react'
import { ToastContext } from 'contexts'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Toast from '@l3-lib/ui-core/dist/Toast'
import Tags from '@l3-lib/ui-core/dist/Tags'
import LinearProgressBar from '@l3-lib/ui-core/dist/LinearProgressBar'

import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import Close from '@l3-lib/ui-core/dist/icons/Close'

import styled, { css } from 'styled-components'

import useLinearProgressBar from './useLinearProgressBar'

type CreateFormType = {
  closeModal: () => void
  formHook: any
  handleSubmit: any
  form: any
  nameValue: string
  categoryValue: any
  backgroundImg?: any
  finishText?: string
}

const CreateForm = ({
  closeModal,
  formHook,
  handleSubmit,
  form,
  nameValue,
  categoryValue,
  backgroundImg,
  finishText = '',
}: CreateFormType) => {
  const { startProgress, progress } = useLinearProgressBar()

  const { toast, setToast } = useContext(ToastContext)

  const [finish, setFinish] = useState(false)

  const onSubmit = formHook.handleSubmit(async (data: any) => {
    await handleSubmit(data)
    setFinish(true)
    startProgress()
  })

  return (
    <StyledRoot>
      <StyledProgressBar value={progress} size={LinearProgressBar.sizes.LARGE} />

      <StyledForm onSubmit={onSubmit}>
        <StyledIconButtonWrapper>
          <IconButton
            onClick={closeModal}
            icon={Close}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
          />
        </StyledIconButtonWrapper>

        <StyledContainer>
          <StyledFormWrapper finish={finish}>{form}</StyledFormWrapper>

          <StyledFinishWrapper finish={finish}>
            <StyledResponseContent>
              <Heading
                type={Heading.types.h1}
                value={finishText}
                size='medium'
                customColor={'rgba(255, 255, 255, 0.4)'}
              />
              <StyledResponseHeading
                type={Heading.types.h1}
                value={nameValue}
                customColor={'#fff'}
              />
            </StyledResponseContent>
            <StyledTagsWrapper>
              {Array.isArray(categoryValue) ? (
                categoryValue.map((value: string) => (
                  <Tags key={value} label={value} readOnly color={Tags.colors.white} />
                ))
              ) : (
                <Tags label={categoryValue} readOnly color={Tags.colors.white} />
              )}
            </StyledTagsWrapper>
          </StyledFinishWrapper>

          <StyledButtonWrapper finish={finish}>
            <Button type='submit' leftIcon={PlayOutline} size={Button.sizes.LARGE}>
              Start
            </Button>
          </StyledButtonWrapper>
        </StyledContainer>

        <StyledImageWrapper image={backgroundImg} />
      </StyledForm>

      {finish && (
        <Toast
          label={toast?.message}
          type={toast?.type}
          autoHideDuration={4000}
          open={toast?.open}
          onClose={() => setToast({ open: false })}
        />
      )}
    </StyledRoot>
  )
}

export default CreateForm

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const StyledForm = styled.form`
  position: relative;
  display: flex;

  /* border: 2px red solid; */
  justify-content: flex-end;

  height: 100%;

  /* min-height: 600px;
  min-width: 1000px; */
`
const StyledProgressBar = styled(LinearProgressBar)`
  /* width: 100vw; */
  /* position: absolute; */
`

const StyledIconButtonWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  padding: 20px;

  z-index: 1;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;

  padding: 64px;

  height: 100%;
  width: 100%;
`

const StyledImageWrapper = styled.div<{ image: string }>`
  height: 100%;
  width: 100%;

  background-image: ${p => p.image && `url(${p.image})`};
  background-repeat: no-repeat;
  background-size: cover;

  mix-blend-mode: lighten;

  z-index: 0;
`

const StyledFinishWrapper = styled.div<{ finish?: boolean }>`
  margin-top: auto;
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 55px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  align-items: center;

  pointer-events: none;

  opacity: 0;
  transition: opacity 300ms;
  ${props =>
    props.finish &&
    css`
      opacity: 1;
    `}
`

const StyledTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const StyledButtonWrapper = styled.div<{ finish: boolean }>`
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
const StyledResponseContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
`

const StyledResponseHeading = styled(Heading)`
  font-size: 90px;
  line-height: 120px;
`
const StyledFormWrapper = styled.div<{ finish?: boolean }>`
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
