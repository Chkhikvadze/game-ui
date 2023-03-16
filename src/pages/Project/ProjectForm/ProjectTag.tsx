import Tags from '@l3-lib/ui-core/dist/Tags'
import CloseIcon from '@l3-lib/ui-core/dist/icons/Close'
import { Option } from 'utils/constants'

type ProjectTagProps = {
  option: Option
  selected: boolean
  isClickable: boolean
  projectCategory: string
  onClick: () => void
}

const ProjectTag = ({
  option,
  selected,
  isClickable,
  projectCategory,
  onClick,
}: ProjectTagProps) => {
  const { value } = option

  return (
    <Tags
      key={value}
      label={value}
      readOnly
      isClickable={isClickable}
      outlined={value !== projectCategory}
      onClick={onClick}
      color={selected ? Tags.colors.white : 'rgba(255, 255, 255, 0.2)'}
      leftIcon={CloseIcon}
    />
  )
}

export default ProjectTag
