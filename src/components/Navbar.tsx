import { useContext, useRef } from 'react'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css'

import useUploadFile from 'hooks/useUploadFile'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import MenuTitle from '@l3-lib/ui-core/dist/MenuTitle'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import DialogContentContainer from '@l3-lib/ui-core/dist/DialogContentContainer'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import BurgerMenuIconSvg from 'assets/svgComponents/BurgerMenuIconSvg'
import Label from 'atoms/Label'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext } from 'contexts'

import { StyledFlex } from 'styles/globalStyle.css'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'

import defaultLogo from '../assets/icons/defaultLogo.svg'

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
  onClickGoBack?: any
  backText?: string
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
  onClickGoBack,
  backText = 'back',
}: NavbarProps) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const fullName = user && `${user.first_name} ${user.last_name}`

  const { pathname } = useLocation()
  const pathArr = pathname && pathname.split('/')

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

  const onClickNavigate = (route: string) => {
    navigate(route)
  }

  return (
    <StyledNavBar showMenu={showMenu}>
      <StyledTopColumn showMenu={showMenu}>
        <StyledBackButton onClick={onClickGoBack}>
          {!showMenu && showHeader && (
            <>
              <LeftArrowIconSvg /> {backText}
            </>
          )}
        </StyledBackButton>
        <StyledBurgerIcon onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
          {showMenu ? <BurgerMenuIconSvg /> : <CloseIconSvg />}
        </StyledBurgerIcon>
      </StyledTopColumn>

      <DialogContentContainer collapsed={showMenu}>
        <StyledMenu
          size='large'
          collapsed={showMenu}
          useDocumentEventListeners={true}
          className='navbar__menu'
        >
          {navbarTitle && (
            <StyledMenuTitle
              imageSrc={logo || defaultLogo}
              onImageClick={() => onButtonClick()}
              size='bg'
              collapsed={showMenu}
            >
              {!showMenu && (
                <StyledEditableHeading
                  editing={isCreate}
                  value={isCreate ? '' : navbarTitle}
                  type={EditableHeading.types.h1}
                  onCancelEditing={() => navigate(-1)}
                  onFinishEditing={(value: any) => {
                    if (value === '') {
                      updateHeader('Untitled')
                    } else {
                      updateHeader(value)
                    }
                  }}
                />
              )}
            </StyledMenuTitle>
          )}
          {navbarItems &&
            navbarItems?.map((item: any) => (
              <MenuItem
                key={item.name}
                collapsed={showMenu}
                icon={item.icon}
                title={item.name}
                onClick={() => onClickNavigate(item.routeLink)}
                description={`${item.name} description`}
                active={pathArr[1] === item.active}
              />
            ))}
        </StyledMenu>
      </DialogContentContainer>

      <StyledAvatarColumn showMenu={showMenu}>
        <AvatarDropDown />
        {!showMenu && <Label color={'white'}>{fullName}</Label>}
      </StyledAvatarColumn>
      <input
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={(event: any) => changeHandler(event)}
      />
    </StyledNavBar>
  )
}

export default Navbar

const StyledNavBar = styled.nav<{ showMenu?: boolean }>`
  padding: ${p => (p.showMenu ? '28px 16px' : '46px 32px')};
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr auto;
  max-height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
  justify-content: ${p => (p.showMenu ? 'center' : null)};
  padding: 0 23px;
`

const StyledAvatarColumn = styled.div<{ showMenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  justify-content: ${p => (p.showMenu ? 'center' : null)};
  margin-top: 40px;
`

const StyledMenu = styled(Menu)`
  width: -webkit-fill-available;
`

const StyledMenuTitle = styled(MenuTitle)<{ collapsed?: boolean }>`
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0px;
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
  margin-bottom: 15px;
`
