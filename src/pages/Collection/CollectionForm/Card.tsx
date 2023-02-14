import Button from '@l3-lib/ui-core/dist/Button'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

interface CardProps {
  title?: string
  description?: string
  onButtonClick?: (event: any) => void
  image?: string
  defaultImage?: string
}

const Card = ({ title, description, onButtonClick, image, defaultImage }: CardProps) => {
  let blend: any
  let mainImage: any
  if (image) {
    blend = 'normal'
    mainImage = image
  } else {
    blend = 'screen'
    mainImage = defaultImage
  }

  return (
    <StyledRoot>
      <img
        style={{ width: '100%', height: '100%', borderRadius: '10px', mixBlendMode: blend }}
        src={mainImage}
        alt=""
      />
      <div
        style={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(2px)',
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px 24px',
          gap: ' 8px',
          borderRadius: '0px 0px 10px 10px',
        }}
      >
        <div>
          <Heading type={Heading.types.h2} size="small" value={title} />
          <Typography
            value={description}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            as={'p'}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <Button onClick={onButtonClick} kind={Button.kinds.SECONDARY}>
            Add
          </Button>
        </div>
      </div>
    </StyledRoot>
  )
}

export default Card

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  min-width: 300px;
  /* background: linear-gradient(180deg, #4ca6f8 0%, #2152f3 100%); */
  /* background-position: center; */
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
  /* mix-blend-mode: normal; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 10px;
`
