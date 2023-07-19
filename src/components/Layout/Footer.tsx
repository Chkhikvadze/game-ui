import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { StyledFooter, StyledAvatarContainer } from './LayoutStyle'

import AvatarDropDown from 'components/AvatarDropDown'
import Spotlight from 'components/Spotlight/Spotlight'

const Footer = () => {
  const { user } = useContext(AuthContext)
  const { first_name } = user
  return (
    <StyledFooter id='main_footer'>
      <StyledAvatarContainer>
        <AvatarDropDown />
        <span>{first_name}</span>
      </StyledAvatarContainer>
      <div>
        <Spotlight />
      </div>
      <div></div>
    </StyledFooter>
  )
}

export default Footer
