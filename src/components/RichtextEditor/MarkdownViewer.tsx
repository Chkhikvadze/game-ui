import ReactQuill, { Quill } from 'react-quill'
import styled from 'styled-components'

export interface ViewerProps {
  value: string
}

export default function Viewer({ value }: ViewerProps) {
  const quillModules = {
    toolbar: false, // Hide the toolbar
  }
  return (
    <div>
      <StyledEditorInput readOnly={true} value={value} modules={quillModules} />
    </div>
  )
}

const StyledEditorInput = styled(ReactQuill)`
  .ql-container.ql-snow {
    border: none !important;
  }

  .ql-editor {
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }
`
