import React from 'react'
import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
// import { Butler, IconEye, IconHeadPhone, YoutubeIcon } from 'assets/old/images/navbar'
import { Butler } from 'assets/old/images/navbar'
// import { useModal } from 'hooks'
// import DropdownMenu from 'molecules/DropdownMenu'
// import DropdownItem from 'molecules/DropdownItem'
import Typography from 'oldComponents/atoms/Typography'
import { bookDemoLink } from 'oldHelpers/links'
import Link from 'oldComponents/atoms/Link'

const StyledTrigger = styled(Link)`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Services = () => (
  // const navigate = useNavigate()
  // const { openModal } = useModal()

  // const redirect = (toggle: any, to: string) => () => {
  //   navigate(to)
  //   toggle(false)
  // }

  // <StyledTrigger  onClick={(e) => {
  //   e.preventDefault()
  //   openModal({ name: 'book-demo-modal' })
  // }}>
  //   <Typography weight={400} variant="label" color="white">
  //     Bureau Services
  //   </Typography>
  //   <img src={Butler} alt="Icon" className="ml-2" />
  // </StyledTrigger>
  <StyledTrigger href={bookDemoLink} target={'_blank'} rel='noopener noreferrer'>
    <Typography weight={400} variant='label' color='white'>
      Bureau Services
    </Typography>
    <img src={Butler} alt='Icon' className='ml-2' />
  </StyledTrigger>
  // <DropdownMenu
  //   trigger={(
  //     <StyledTrigger>
  //       <Typography weight={400} variant="label" color="white">
  //         Bureau Services
  //       </Typography>
  //       <img src={Butler} alt="Icon" className="ml-2" />
  //     </StyledTrigger>
  //   )}
  // >
  //   {toggle => (
  //     <React.Fragment>
  //       <DropdownItem
  //         width={mobile ? 300 : 230}
  //         icon={YoutubeIcon}
  //         label="Unlock Bureau Services"
  //         subMenuPosition="left"
  //         subMenuLabel="Watch this video (2 min) to learn how unlock BetterFleet additional features listed below"
  //         className="submenu submenu-left"
  //         onClick={() => openModal({
  //           name: 'video-modal',
  //           data: {
  //             header: 'Bureau Services',
  //             url: 'https://biteable.com/watch/embed/betterfleet-bureau-services-2459498',
  //           },
  //         })}
  //       />
  //
  //       <DropdownItem
  //         width={mobile ? 300 : 230}
  //         icon={IconEye}
  //         label="Discover Bureau Services"
  //         to="/bureau-service"
  //         onClick={redirect(toggle, '/bureau-service')}
  //       />
  //
  //       <DropdownItem
  //         icon={IconHeadPhone}
  //         width={mobile ? 300 : 230}
  //         label="Ask for a demo"
  //         onClick={() => openModal({ name: 'book-demo-modal' })}
  //       />
  //     </React.Fragment>
  //   )}
  // </DropdownMenu>
)

export default Services
