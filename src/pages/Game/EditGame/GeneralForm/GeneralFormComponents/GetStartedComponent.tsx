import { useState } from 'react'
import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import MultiStepIndicator from '@l3-lib/ui-core/dist/MultiStepIndicator'

import GeneralFormCard from './GeneralFormCard'

import videoContentExample from '../../../GameForm/assets/videoContentExample.png'
import videoContentExample2 from '../../../GameForm/assets/videoContentExample2.png'
import { useCollection } from 'pages/Collection/Collections/useCollection'
import CreateCollectionModal from 'modals/CreateCollectionModal'

const GetStartedComponent = () => {
  const [selected, setSelected] = useState<any>({ collection: 'normal' })

  const { openCreateCollectionModal } = useCollection()

  return (
    <StyledTopSection>
      <Heading value={'Get started'} type={Heading.types.h1} customColor='#FFFFFF' size='medium' />
      <Typography
        value={
          'Learn how to start, and how L3 platform simplifies the process of creating, deploying, and managing your game!'
        }
        type={Heading.types.p}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.6)'
      />

      <StyledTopSectionColumns>
        <StyledColumn>
          <GeneralFormCard
            progress={{ status: 'normal', count: 0 }}
            onClick={() => setSelected({ collection: 'normal' })}
            selected={selected.collection}
            title={'Collection'}
            description={'Organise assets by themes, genres, sync contracts and more.'}
            buttonLabel={'Let’s start'}
            onButtonClick={openCreateCollectionModal}
          />
          <GeneralFormCard
            progress={{ status: 'warning', count: 30 }}
            onClick={() => setSelected({ contract: 'warning' })}
            selected={selected.contract}
            title={'Contracts'}
            description={'Create/manage agreements for in-game transactions.'}
            buttonLabel={'Continue'}
          />
          <GeneralFormCard
            progress={{ status: 'error', count: 50 }}
            onClick={() => setSelected({ assets: 'error' })}
            selected={selected.assets}
            title={'Assets'}
            description={'Upload, sync, and manage media and metadata. '}
            buttonLabel={'Let’s start'}
          />
        </StyledColumn>

        <StyledExplanationColumn>
          <StyledExplanation show={selected.collection}>
            <img src={videoContentExample} alt='' />

            <div>
              <Heading
                value={'Create a collection'}
                type={Heading.types.h1}
                customColor='#FFFFFF'
                size='medium'
              />
              <Typography
                value={
                  'Learn how to start, and how L3 platform simplifies the process of creating, deploying, and managing your game!'
                }
                type={Heading.types.p}
                size={Typography.sizes.lg}
                customColor='rgba(255, 255, 255, 0.6)'
              />
            </div>
            <StyledMultiStepIndicatorWrapper>
              <StyledMultiStepIndicator
                steps={[
                  {
                    titleText: 'Create a collection',
                    subtitleText:
                      'L3 support a variety of contract kinds; further details are available on page.',
                    stepNumber: 1,
                  },
                ]}
              />
              <StyledLine />
            </StyledMultiStepIndicatorWrapper>
            <StyledMultiStepIndicatorWrapper>
              <StyledMultiStepIndicator
                steps={[
                  {
                    titleText: 'Upload',
                    subtitleText:
                      'L3 support a variety of contract kinds; further details are available on page.',
                    stepNumber: 2,
                  },
                ]}
              />
              <StyledLine />
            </StyledMultiStepIndicatorWrapper>
            <StyledMultiStepIndicatorWrapper>
              <StyledMultiStepIndicator
                steps={[
                  {
                    titleText: 'Add details',
                    subtitleText: 'As many details',
                    stepNumber: 3,
                  },
                ]}
              />
            </StyledMultiStepIndicatorWrapper>
          </StyledExplanation>

          <StyledExplanation show={selected.contract}>
            <img src={videoContentExample2} alt='' />

            <div>
              <Heading
                value={'Create a contract'}
                type={Heading.types.h1}
                customColor='#FFFFFF'
                size='medium'
              />
              <Typography
                value={
                  'Learn how to start, and how L3 platform simplifies the process of creating, deploying, and managing your game!'
                }
                type={Heading.types.p}
                size={Typography.sizes.lg}
                customColor='rgba(255, 255, 255, 0.6)'
              />
            </div>
          </StyledExplanation>

          <StyledExplanation show={selected.assets}></StyledExplanation>
        </StyledExplanationColumn>
      </StyledTopSectionColumns>

      <CreateCollectionModal />
    </StyledTopSection>
  )
}

export default GetStartedComponent

const StyledTopSection = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`

const StyledTopSectionColumns = styled.div`
  display: flex;

  gap: 32px;

  margin-top: 24px;
  margin-bottom: 20px;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`
const StyledExplanationColumn = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  min-width: 600px;
  width: 100%;
  /* height: 550px; */

  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledExplanation = styled.div<{ show: boolean }>`
  position: absolute;

  min-width: 600px;
  width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 32px;

  isolation: isolate;

  pointer-events: none;

  opacity: 0;
  transition: opacity 0.3s;

  ${props =>
    props.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`
const StyledMultiStepIndicator = styled(MultiStepIndicator)`
  padding-left: 0px;
`
const StyledLine = styled.div`
  height: 38px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  width: 0px;

  margin-left: 27px;
`
const StyledMultiStepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
