import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

type CustomBadgeProps = {
  label: string
  selected?: boolean
  onClick: () => void
}

const CustomBadge = ({ label, onClick, selected = false }: CustomBadgeProps) => {
  return (
    <StyledRoot onClick={onClick}>
      <StyledBadge selected={selected}>
        <Typography
          value={label}
          type={Typography.types.P}
          size={Typography.sizes.lg}
          customColor={'#fff'}
        />
      </StyledBadge>
    </StyledRoot>
  )
}

export default CustomBadge

const StyledRoot = styled.div`
  padding: 4px;
`

const StyledBadge = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  min-width: 60px;
  border-radius: 6px;
  padding: 4px 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  /* backdrop-filter: blur(100px); */
  background: rgba(0, 0, 0, 0.2);

  /* outline: ${p => p.selected && '2px solid #73FAFD'}; */
  box-shadow: ${p => p.selected && '0 0 0 2px #73fafd'};
`
