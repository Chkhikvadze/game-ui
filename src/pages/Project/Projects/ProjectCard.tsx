import Button from '@l3-lib/ui-core/dist/Button'
import CloseOutline from '@l3-lib/ui-core/dist/icons/CloseOutline'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import { useState } from 'react'
import moment from 'moment'

interface ProjectCardProps {
  title?: string
  description?: string
  category?: string
  onButtonClick?: (event: unknown) => void
  image?: string
  logo?: string
  defaultImage?: string
  defaultLogo?: string
  created?: Date
  collection?: { image: [string]; length: number }
  players?: { image: [string]; length: number }
}

const ProjectCard = ({
  title,
  description,
  onButtonClick,
  category,
  image,
  logo,
  defaultImage,
  defaultLogo,
  created,
  collection,
  players,
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <StyledRoot>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <StyledImage src={image ? image : defaultImage} alt='' showDetails={showDetails} />
        {!showDetails && <StyledNoContent></StyledNoContent>}
      </div>

      <StyledContentDiv showDetails={showDetails}>
        <StyledAvatarWrapper showDetails={showDetails}>
          <Avatar
            size={Avatar.sizes.SMALL}
            src={logo ? logo : defaultLogo}
            type={Avatar.types.IMG}
            rectangle
          />
        </StyledAvatarWrapper>
        <StyledTextWrapper showDetails={showDetails}>
          <Typography
            value={title}
            type={Typography.types.LABEL}
            size={showDetails ? Typography.sizes.md : Typography.sizes.sm}
            customColor='#fff'
          />

          <Typography
            value={showDetails ? `Created: ${moment(created).format('MMM YYYY')}` : category}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            customColor='rgba(255, 255, 255, 0.8)'
          />
        </StyledTextWrapper>
        <StyledButtonWrapper showDetails={showDetails}>
          <IconButton
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.TERTIARY}
            icon={showDetails ? CloseOutline : NavigationChevronUp}
            onClick={(event: unknown) => {
              setShowDetails(!showDetails)
              if (onButtonClick && !showDetails) {
                onButtonClick(event)
              }
            }}
          />
        </StyledButtonWrapper>
        {showDetails && (
          <StyledDetailWrapper>
            {players?.length && (
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  value={`${players?.length} Players`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor='#fff'
                />
                <div style={{ display: 'flex', gap: '0' }}>
                  {players?.image &&
                    players.image
                      .slice(0, 4)
                      .map((image: string) => (
                        <Avatar
                          key={image}
                          size={Avatar.sizes.SMALL}
                          src={image}
                          type={Avatar.types.IMG}
                          rectangle
                        />
                      ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Typography
                value={collection && `${collection.length} Collection`}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor='#fff'
              />
              <StyledCollectionWrapper>
                {collection?.image &&
                  collection.image.map((image: string) => (
                    <StyledCollectionImg key={image} src={image} alt='' />
                  ))}
              </StyledCollectionWrapper>
            </div>

            {description && (
              <div>
                <Typography
                  value={'Quick take: '}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor='#fff'
                />
                <Typography
                  value={description}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor='rgba(255, 255, 255, 0.8)'
                />
              </div>
            )}
          </StyledDetailWrapper>
        )}
      </StyledContentDiv>
    </StyledRoot>
  )
}

export default ProjectCard

const StyledRoot = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;
  justify-content: flex-end;

  height: 300px;
  width: 260px;

  border-radius: 16px;
`

const StyledImage = styled.img<{ showDetails?: any }>`
  width: 100%;
  height: 100%;
  border-radius: ${p => (p.showDetails ? '16px' : '16px 16px 0px 0px ')};
`

const StyledNoContent = styled.div`
  background: linear-gradient(175.64deg, rgba(0, 0, 0, 0) 3.54%, #000000 96.46%);
  position: absolute;

  height: 33%;
  width: 100%;
`

const StyledContentDiv = styled.div<{ showDetails?: any }>`
  display: flex;
  flex-direction: ${p => (p.showDetails ? 'column' : 'row')};
  justify-content: ${p => (p.showDetails ? 'flex-start' : 'center')};
  align-items: center;
  /* padding: 0px 12px 0px 6px; */
  gap: 10px;

  padding: ${p => (p.showDetails ? '12px' : '0px 12px 8px 12px')};

  width: 100%;

  position: ${p => (p.showDetails ? 'absolute' : 'auto')};
  height: ${p => (p.showDetails ? '100%' : 'fit-content')};
  /* height: fit-content; */
  background: ${p =>
    p.showDetails
      ? 'rgba(0, 0, 0, 0.7)'
      : 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%)'};
  box-shadow: ${p => (p.showDetails ? '0px 2px 6px rgba(0, 0, 0, 0.15)' : 'auto')};
  backdrop-filter: ${p => (p.showDetails ? 'blur(100px)' : 'blur(50px)')};
  border-radius: ${p => (p.showDetails ? '16px' : '0px 0px 16px 16px')};

  overflow: ${p => (p.showDetails ? 'scroll' : 'unset')};
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledDetailWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledTextWrapper = styled.div<{ showDetails?: any }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: ${p => (p.showDetails ? 'center' : 'flex-start')};
  overflow: ${p => (p.showDetails ? 'none' : 'hidden')};
`

const StyledButtonWrapper = styled.div<{ showDetails?: any }>`
  position: ${p => (p.showDetails ? 'absolute' : 'auto')};
  align-self: flex-end;
`
const StyledAvatarWrapper = styled.div<{ showDetails?: any }>`
  margin-top: ${p => p.showDetails && '20px'};
  width: fit-content;
  margin-bottom: 8px;
`
const StyledCollectionWrapper = styled.div`
  display: flex;
  gap: 6px;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledCollectionImg = styled.img`
  width: 96px;
  height: 96px;
`
