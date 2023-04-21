import React from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  homeIcon,
  YoutubeIcon,
  // mappin,
  truck,
  folderplus,
  Bookopen,
  zap,
  IconArrowDown,
} from 'assets/old/images/navbar/index'
import { useModal } from 'hooks'
import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import DropdownItem from 'oldComponents/molecules/DropdownItem'
import Typography from 'oldComponents/atoms/Typography'
// import { bookDemoLink } from 'helpers/links'

const StyledTrigger = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  justify-content: center;
`

const StyledImage = styled.img`
  filter: brightness(0) invert(1);
`

const MyDashboard = ({ mobile = false }: { mobile?: boolean }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openModal } = useModal()

  const redirect = (toggle: any, to: string) => () => {
    navigate(to)
    toggle(false)
  }

  return (
    <DropdownMenu
      trigger={
        <StyledTrigger>
          <Typography weight={400} variant='label' color='white'>
            {location.pathname === '/browse-vehicles' ? 'Browse vehicles' : 'Dashboard'}
          </Typography>

          <StyledImage src={IconArrowDown} width={8} alt='see available routes' />
        </StyledTrigger>
      }
    >
      {toggle => (
        <React.Fragment>
          <DropdownItem
            icon={homeIcon}
            label='Home'
            to='/dashboard'
            onClick={redirect(toggle, '/dashboard')}
            width={mobile ? 300 : 170}
          />

          <DropdownItem
            icon={YoutubeIcon}
            label='Get started'
            subMenuLabel='Watch this video (3 min) to learn how to compare vehicles, create a game and run a basic report'
            className='submenu'
            width={mobile ? 300 : 170}
            onClick={() =>
              openModal({
                name: 'video-modal',
                data: {
                  url: 'https://www.youtube.com/embed/afTHRtpB_1k',
                  header: 'Get started',
                },
              })
            }
          />
          {/*
		   <DropdownItem
		   icon={mappin}
		   label="Book a demo"
		   subMenuLabel="book a free one hour consultation and training session"
		   className="submenu"
		   width={mobile ? 300 : 170}
		   onClick={() => window.open(bookDemoLink, '_blank')}
		   
		   // onClick={() => openModal({ name: 'book-demo-modal' })}
		   /> */}

          <DropdownItem
            icon={truck}
            label='Browse Vehicles'
            to='/browse-vehicles'
            onClick={redirect(toggle, '/browse-vehicles')}
            className='submenu'
            width={mobile ? 300 : 170}
            subMenuLabel='browse from a list of all available vehicles in Australia'
          />

          <DropdownItem
            icon={folderplus}
            label='Projects'
            to='/projects'
            onClick={redirect(toggle, '/projects')}
            className='submenu'
            width={mobile ? 300 : 170}
            subMenuLabel='go to your projects list'
          />

          <DropdownItem
            icon={Bookopen}
            label='Resources'
            onClick={() =>
              window.open('http://fleets.chargetogether.org/knowledge-base/', '_blank')
            }
            className='submenu'
            width={mobile ? 300 : 170}
            subMenuLabel='browse our knowledge modules, vehicle guide and keep up to date with the latest news and webinars'
          />

          <DropdownItem
            icon={zap}
            label='Community'
            width={mobile ? 300 : 170}
            onClick={() => window.open('https://www.linkedin.com/groups/10538731/', '_blank')}
            className='submenu'
            subMenuLabel='network and learn with industry experts and your peers'
          />
        </React.Fragment>
      )}
    </DropdownMenu>
  )
}

export default MyDashboard
