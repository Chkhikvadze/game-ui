import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { StyledFooter, StyledAvatarContainer } from './LayoutStyle'

import AvatarDropDown from 'components/AvatarDropDown'

const Footer = () => {
  const { user } = useContext(AuthContext)
  const { first_name } = user
  return (
    <StyledFooter id='main_footer'>
      <StyledAvatarContainer>
        <AvatarDropDown />
        <span>{first_name}</span>
      </StyledAvatarContainer>
    </StyledFooter>
  )
}

export default Footer
