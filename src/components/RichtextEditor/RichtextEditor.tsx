import { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  alignCenterIcon,
  alignLeftIcon,
  alignRightIcon,
  boldIcon,
  bulletIcon,
  italicIcon,
  orderIcon,
  underlineIcon,
} from './components/Icons'
import { StyledEditorInput } from './RichTextStyle'

type RichtextEditorProps = {
  onChange: (value: string) => void
  value: string
  transparent?: boolean
  centeredToolbar?: boolean
}

const TOOLBAR_OPTIONS = [
  [
    'bold',
    'italic',
    'underline',
    { list: 'bullet' },
    { list: 'ordered' },
    { align: '' },
    { align: 'center' },
    { align: 'right' },
  ],
]

const icons = Quill.import('ui/icons')
icons['bold'] = boldIcon
icons['italic'] = italicIcon
icons['underline'] = underlineIcon
icons.list['bullet'] = bulletIcon
icons.list['ordered'] = orderIcon
icons.align[''] = alignLeftIcon
icons.align['center'] = alignCenterIcon
icons.align['right'] = alignRightIcon

const RichtextEditor = ({
  onChange,
  value,
  transparent = false,
  centeredToolbar = false,
}: RichtextEditorProps) => {
  return (
    <div>
      <StyledEditorInput
        placeholder='Your story...'
        transparent={transparent}
        centeredToolbar={centeredToolbar}
        value={value}
        onChange={(value: string) => {
          onChange(value)
        }}
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
        }}
      />
    </div>
  )
}

export default RichtextEditor
