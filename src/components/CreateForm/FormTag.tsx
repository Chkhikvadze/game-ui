import Tags from '@l3-lib/ui-core/dist/Tags'
import CloseIcon from '@l3-lib/ui-core/dist/icons/Close'
// import { Option } from 'utils/constants'
// import CloseIcon from '@l3-lib/ui-core/dist/icons/Close'
import { Option } from 'utils/constants'

type FormTagProps = {
  // option: Option
  value: string
  selected: boolean
  isClickable: boolean
  // formCategory: string
  onClick: () => void
}

const FormTag = ({ value, selected, isClickable, onClick }: FormTagProps) => {
  return (
    <Tags
      key={value}
      label={value}
      readOnly
      isClickable={isClickable}
      outlined={!selected}
      onClick={onClick}
      color={selected ? Tags.colors.white : 'rgba(255, 255, 255, 0.2)'}
      // leftIcon={CloseIcon}
    />
  )
}

export default FormTag
