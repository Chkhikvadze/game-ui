import styled from 'styled-components'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'

type AgentDropdownProps = {
  label: string
  value: any
  options: any
  placeholder: string
  onChange: (option: any) => void
  onOptionRemove?: (option: any) => void
  isMulti?: boolean
}

const AgentDropdown = ({
  value,
  options,
  placeholder,
  onChange,
  label,
  isMulti,
  onOptionRemove,
}: AgentDropdownProps) => {
  return (
    <StyledWrapper>
      <Typography
        value={label}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor={'#FFF'}
      />
      <Dropdown
        multi={isMulti}
        menuPlacement={'auto'}
        insideOverflowContainer
        size={Dropdown.size.MEDIUM}
        value={value}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        onOptionRemove={onOptionRemove}
      />
    </StyledWrapper>
  )
}

export default AgentDropdown

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
