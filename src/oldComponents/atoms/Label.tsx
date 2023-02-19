import styled from 'styled-components'

const getFontSize = (size?: string) => {
  if (size === 'big') return '1.25rem'
  if (size === 'small') return '0.7rem'
  return '1rem'
}

type LabelType = {
  size?: string
  weight?: number
  color?: string
  underline?: boolean
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  pointer?: boolean
}

const Label = styled.p<LabelType>`
  font-size: ${props => getFontSize(props.size)} !important;
  font-weight: ${props => props.weight || 300};
  margin: 0px !important;
  color: ${props => props.color || 'white'} !important;
  ${props => props.underline && 'text-decoration: underline;'}
  font-family: "Roboto", sans-serif;
  word-break: break-word;

  ${props => props.mt !== undefined && `margin-top: ${props.mt}px !important;`}
  ${props => props.mb !== undefined && `margin-bottom: ${props.mb}px !important;`}
  ${props => props.ml !== undefined && `margin-left: ${props.ml}px !important;`}
  ${props => props.mr !== undefined && `margin-right: ${props.mr}px !important;`}

  ${props => props.pointer && 'cursor: pointer;'}
`

export default Label
