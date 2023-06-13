import styled, { css } from 'styled-components'
import ReactQuill from 'react-quill'

export const StyledEditorInput = styled(ReactQuill)<{
  transparent: boolean
  centeredToolbar: boolean
}>`
  .ql-container.ql-snow {
    margin-top: 25px;
    border: none !important;
  }
  .ql-editor {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    max-height: 100%;

    min-height: 400px !important;
    max-height: 400px;

    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }
  .ql-toolbar {
    border: none !important;
  }

  .ql-toolbar.ql-snow .ql-formats {
    display: flex;
    gap: 30px;
  }

  .ql-editor::before {
    /* content: attr(data-placeholder); */
    color: rgba(255, 255, 255, 0.8);
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }

  /* .ql-toolbar .ql-bold,
  .ql-toolbar .ql-italic {
    color: #fff !important;
    &:hover {
   
      border-radius: 100px;
      height: fit-content;
    }
  } */

  .ql-snow.ql-toolbar button {
    height: 30px;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ql-snow.ql-toolbar button:hover,
  .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button:focus,
  .ql-snow .ql-toolbar button:focus,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-snow .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 100px;
    height: 30px;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${props =>
    props.transparent &&
    css`
      .ql-editor {
        background: transparent;
      }
    `}
  ${props =>
    props.centeredToolbar &&
    css`
      .ql-toolbar.ql-snow .ql-formats {
        justify-content: center;
      }
    `}
`
