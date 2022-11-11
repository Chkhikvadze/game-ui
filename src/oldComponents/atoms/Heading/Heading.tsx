import React from 'react'

import HeadingNavigation from './HeadingNavigation'

import Typography from 'oldComponents/atoms/Typography'
import Breadcrumbs from 'oldComponents/atoms/BreadCrumb'

import {
  StyledRoot,
  StyledContainer,
  StyledLeftSide,
  StyledRightSide,
} from './HeadingStyle'

type HeadingProps = {
  title?: string
  withNavigation?: boolean
  leftSide?: React.ReactNode
  rightSide?: React.ReactNode
  breadcrumbValue?: string
}

const Heading = ({title, withNavigation, leftSide, rightSide, breadcrumbValue}: HeadingProps) => (
  <>
	<Breadcrumbs breadcrumbValue={breadcrumbValue}/>
	
	<StyledRoot leftSide={Boolean(leftSide)}>
	  <Typography weight={600} variant="h3">
		{title}
	  </Typography>
	  
	  <StyledContainer leftSide={Boolean(leftSide)}>
		{leftSide && <StyledLeftSide>{leftSide}</StyledLeftSide>}
		{rightSide && <StyledRightSide>{rightSide}</StyledRightSide>}
		{withNavigation && <HeadingNavigation/>}
	  </StyledContainer>
	</StyledRoot>
  </>
)

export default Heading