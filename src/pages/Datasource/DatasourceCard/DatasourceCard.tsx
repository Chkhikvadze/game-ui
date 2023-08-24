import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

type DatasourceCardProps = {
  title: string
  subTitle: string
  onEditClick: () => void
  onDeleteClick: () => void
}

const DatasourceCard = ({ title, subTitle, onEditClick, onDeleteClick }: DatasourceCardProps) => {
  return (
    <StyledCard>
      <StyledTextWrapper>
        <Typography
          value={title}
          type={Typography.types.P}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />
        <Typography
          value={subTitle}
          type={Typography.types.P}
          size={Typography.sizes.md}
          customColor={'rgba(255,255,255, 0.8)'}
        />
      </StyledTextWrapper>
      <StyledButtonsWrapper>
        <IconButton
          onClick={onEditClick}
          icon={() => <Edit />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
        <IconButton
          onClick={onDeleteClick}
          icon={() => <Delete />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
      </StyledButtonsWrapper>
    </StyledCard>
  )
}

export default DatasourceCard

const StyledCard = styled.div`
  width: 400px;
  height: 50px;

  background: rgba(0, 0, 0, 0.2);
  /* backdrop-filter: blur(10px); */
  border: 1px solid #5d6a7d;
  border-radius: 10px;

  display: flex;
  align-items: center;

  padding: 10px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 2px;

  margin-left: auto;
`
const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
