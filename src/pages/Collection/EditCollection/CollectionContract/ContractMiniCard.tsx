import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Add from '@l3-lib/ui-core/dist/icons/Add'

import { useCollectionByIdService } from 'services/useCollectionService'

type ContractMiniCardProps = {
  name?: string
  collectionId?: any
  isEmpty?: boolean
  onClick?: () => void
}

const ContractMiniCard = ({ name, collectionId, isEmpty, onClick }: ContractMiniCardProps) => {
  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  return (
    <StyledRoot onClick={collectionId && onClick} clickable={collectionId}>
      {isEmpty ? (
        <StyledWrapper>
          <StyledButton onClick={onClick}>
            <Add />
          </StyledButton>
          <Typography
            value={'Create Contract'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </StyledWrapper>
      ) : (
        <>
          {!collectionId ? (
            <StyledWrapper>
              <StyledAddButton onClick={onClick}>
                <Add />
              </StyledAddButton>
              <Typography
                value='No linked'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledWrapper>
          ) : (
            <StyledWrapper>
              <StyledImg src={collection?.main_media} />
              <StyledTextWrapper>
                <Typography
                  value={`Linked to`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                />

                <Typography
                  value={`${collection?.name}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                  style={{ textDecoration: 'underline' }}
                />
              </StyledTextWrapper>
            </StyledWrapper>
          )}

          <Typography
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </>
      )}
    </StyledRoot>
  )
}

export default ContractMiniCard

const StyledRoot = styled.div<{ clickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;

  gap: 8px;

  width: 260px;
  height: 158px;

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(8px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 16px;

  ${p =>
    p.clickable &&
    css`
      cursor: pointer;
    `};
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 4px;
`

const StyledAddButton = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
`
const StyledButton = styled.div`
  margin-top: 30px;

  cursor: pointer;
`
const StyledImg = styled.img`
  border-radius: 6px;
  width: 48px;
  height: 48px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;

  align-items: center;
`
