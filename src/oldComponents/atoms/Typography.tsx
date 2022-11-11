import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ToolTipItem from 'oldComponents/molecules/TooltipItem'

type TypographyType = {
  className?: string,
  style?: object,
  children: any,
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'link' | 'caption',
  color?: string,
  weight?: number,
  size?: string,
  mb?: number,
  mt?: number,
  id?: string,
  tooltipId?: string,
  onClick?: (event: React.SyntheticEvent) => void,
  tooltip?: string,
  target?: string,
  mr?: number,
  href?: string,
  ml?: number,
  as?: any,
}
const variants = {
  'h1':'h1',
  'h2':'h2',
  'h3':'h3',
  'h4':'h4',
  'h5':'h5',
  'h6':'h6',
  'label':'p',
  'link':'span',
  'caption':'span',
}
const getFontSize = (variant: string, size?: string) => {
  switch (variant) {
	case 'caption': {
	  if (size === 'small') return '0.625rem'
	  return '0.875rem'
	}
	case 'label':
	case 'link': {
	  if (size === 'big') return '1.25rem'
	  if (size === 'small') return '0.9375rem'
	  return '1rem'
	}
	case 'h2': {
	  return '2.5rem'
	}
	case 'h3': {
	  return '2rem'
	}
	case 'h4': {
	  if (size === 'big') return '1.375rem'
	  return '1.2rem'
	}
	case 'h5': {
	  return '1rem'
	}
	case 'h6': {
	  return '0.75rem'
	}
	default:
	  return '1rem'
  }
}
const getColor = (variant: string, color?: string) => {
  if (variant === 'link') return 'rgb(25, 179, 255)'
  if (color) return color
  return '#212529'
}
const StyledTypography = styled.span<TypographyType>`
  font-family: 'Roboto', sans-serif;
  word-break: normal;
  color: ${(props) => getColor(props.variant, props.color)};
  font-weight: ${(p) => p.weight || 400};
  ${(props) =>
  props.variant === 'label' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'caption' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    display: inline-block;
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'h2' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'h3' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'h4' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'h5' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) =>
  props.variant === 'h6' &&
  `
    font-weight: ${props.weight || 300};
    font-size: ${getFontSize(props.variant, props.size)};
    margin: 0px;
  `}
  ${(props) => props.mt !== undefined && `margin-top: ${props.mt}px !important;`}
  ${(props) => props.mb !== undefined && `margin-bottom: ${props.mb}px !important;`}
  ${(props) => props.ml !== undefined && `margin-left: ${props.ml}px !important;`}
  ${(props) => props.mr !== undefined && `margin-right: ${props.mr}px !important;`}
  ${(props) => props.variant === 'link' && 'cursor: pointer;'}
`
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`
const Typography = ({
  className,
  style,
  children,
  variant,
  as,
  id,
  tooltipId,
  tooltip,
  color,
  ...rest
}: TypographyType) => {
  const renderAs: any = variants[ variant ]
  const typography = (
	<StyledTypography
	  id={id}
	  as={as || renderAs}
	  style={style}
	  variant={variant}
	  color={color}
	  className={className}
	  {...rest}
	>
	  {children}
	  {tooltip && <ToolTipItem id={tooltipId} content={tooltip}/>}
	</StyledTypography>
  )
  if ( !tooltip) {
	return typography
  }
  return <StyledContainer>{typography}</StyledContainer>
}
Typography.propTypes = {
  className:PropTypes.string,
  tooltip:PropTypes.string,
  tooltipId:PropTypes.string,
  style:PropTypes.object,
  children:PropTypes.any,
  color:PropTypes.string,
  variant:PropTypes.string,
}
export default Typography