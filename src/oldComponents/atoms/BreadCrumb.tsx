import React from "react"
// import useBreadcrumbs from "use-react-router-breadcrumbs"
import styled from 'styled-components'

// import routeConfig from '../../routesConfig'
// import Typography from 'oldComponents/atoms/Typography'
// import Arrow from 'assets/old/images/SvgComponents/ArrowRight'

const Breadcrumb = ({breadcrumbValue}: any) => 
// const {t} = useTranslation()
// const breadcrumbs = useBreadcrumbs(routeConfig(breadcrumbValue, t))
  
  (
    <StyledRoot>
	  {/* {breadcrumbs.map(({ breadcrumb, match }:any, index:any) => (
	   <StyledContent key={match.url}>
	   <Typography mr={10} ml={index > 0 ? 10 : 0} variant="link">
	   <StyledLink to={match.url || ''}>{breadcrumb}</StyledLink>
	   </Typography>
	   {index < breadcrumbs.length - 1 && <Arrow />}
	   </StyledContent>
	   ))} */}
    </StyledRoot>
  )


const StyledRoot = styled.div`
  display: flex;
`
// const StyledContent = styled.div`
//   display: flex;
//   align-items: center;
// `
//
// const StyledLink = styled(Link)`
//   color: #0000008c;
//
//   &:hover {
//     color:#007DBA
//   }
// `

export default Breadcrumb
