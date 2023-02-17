import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css'

import useUploadFile from 'hooks/useUploadFile'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import MenuTitle from '@l3-lib/ui-core/dist/MenuTitle'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import DialogContentContainer from '@l3-lib/ui-core/dist/DialogContentContainer'
import { useNavigate, useLocation } from 'react-router-dom'
import BurgerMenuIconSvg from 'assets/svgComponents/BurgerMenuIconSvg'
import Label from 'atoms/Label'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext } from 'contexts'

import { StyledFlex } from 'styles/globalStyle.css'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'

type NavbarProps = {
  showMenu: boolean
  setShowMenu: any
  navbarTitle?: any
  navbarItems?: any
  showHeader?: boolean
  updateHeader?: any
  logo?: string
  updateLogo?: any
  isCreate?: any
}

const Navbar = ({
  showMenu,
  setShowMenu,
  navbarTitle = null,
  navbarItems,
  showHeader = true,
  updateHeader,
  logo,
  updateLogo,
  isCreate,
}: NavbarProps) => {
  let navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const fullName = user && `${user.first_name} ${user.last_name}`

  const { pathname } = useLocation()
  const pathArr = pathname && pathname.split('/')
  const mainPathName = pathArr[1]

  const goBack = () => {
    if (mainPathName === 'game') {
      navigate('/')
    }
    if (mainPathName === 'collection') {
      navigate('/game')
    }
  }

  const inputFile = useRef(null as any)

  const { uploadFile } = useUploadFile()

  const changeHandler = async (event: any) => {
    const { files }: any = event.target
    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
    }
    const res = await uploadFile(fileObj, files[0])

    const newValue = res

    updateLogo(newValue)
  }

  const onButtonClick = async () => {
    inputFile.current.click()
  }

  return (
    <StyledNavBar showMenu={showMenu}>
      <StyledTopColumn showMenu={showMenu}>
        {!showMenu && showHeader && (
          <StyledBackButton onClick={goBack}>
            <LeftArrowIconSvg /> Back
          </StyledBackButton>
        )}
        <StyledBurgerIcon onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
          <BurgerMenuIconSvg />
        </StyledBurgerIcon>
      </StyledTopColumn>

      <DialogContentContainer collapsed={showMenu}>
        <input
          type="file"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={(event: any) => changeHandler(event)}
        />
        <StyledMenu size="large" collapsed={showMenu} className="navbar__menu">
          {navbarTitle && (
            <StyledMenuTitle
              imageSrc={logo}
              onImageClick={() => onButtonClick()}
              size="bg"
              collapsed={showMenu}
            >
              <StyledEditableHeading
                editing={isCreate}
                value={isCreate ? '' : navbarTitle}
                type={EditableHeading.types.h1}
                onCancelEditing={() => navigate(-1)}
                onFinishEditing={(value: any) => {
                  if (value === '') {
                    updateHeader('untitled')
                  } else {
                    updateHeader(value)
                  }
                }}
              />
            </StyledMenuTitle>
          )}
          {navbarItems &&
            navbarItems?.map((item: any) => (
              <MenuItem
                collapsed={showMenu}
                icon={item.icon}
                title={item.name}
                onClick={() => navigate(item.routeLink)}
              />
            ))}
        </StyledMenu>
      </DialogContentContainer>

      <StyledAvatarColumn showMenu={showMenu}>
        <AvatarDropDown />
        {!showMenu && <Label color={'white'}>{fullName}</Label>}
      </StyledAvatarColumn>
    </StyledNavBar>
  )
}

export default Navbar

const StyledNavBar = styled.nav<{ showMenu?: boolean }>`
  padding: ${(p) => (p.showMenu ? '28px 16px' : '46px 32px')};
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr auto;
  max-height: 100vh;
  overflow: scroll;
`

const StyledBurgerIcon = styled.div`
  align-self: center;
  cursor: pointer;
`

const StyledBackButton = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: white;
  display: flex;
  gap: 25px;
  align-items: center;
  cursor: pointer;
  svg {
    path {
      fill: #fff;
      fill-opacity: 1;
    }
  }
`

const StyledTopColumn = styled(StyledFlex)<{ showMenu?: boolean }>`
  margin-bottom: 24px;
  justify-content: ${(p) => (p.showMenu ? 'center' : null)};
  padding: 0 23px;
`

const StyledAvatarColumn = styled.div<{ showMenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  justify-content: ${(p) => (p.showMenu ? 'center' : null)};
  margin-top: 40px;
`

const StyledMenu = styled(Menu)`
  width: -webkit-fill-available;
`

const StyledMenuTitle = styled(MenuTitle)<{ collapsed?: boolean }>`
  padding: 0;
  ${({ collapsed }) =>
    collapsed &&
    `
    justify-content: center;
  `}
  label {
    color: #fff !important;
  }
`
const StyledEditableHeading = styled(EditableHeading)`
  width: 250px;
  color: #fff;
`
