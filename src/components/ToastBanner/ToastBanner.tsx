import ArrowRight from 'assets/old/images/SvgComponents/ArrowRight'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'

interface dataTypes {
  value: string
  info: string
}

interface dropDownDataType {
  header_title?: string
  data?: dataTypes[]
}

interface ToastBannerType {
  type: 'negative' | 'warning' | 'normal'
  title?: string
  dropDownData?: dropDownDataType
  menuType: 'dropDown' | 'insideContent'
  description?: string
  buttonOption?: any
}

interface ToastDropDownContainerType {
  dropDownData?: dropDownDataType
}

const ToastDropDownContainer = ({ dropDownData }: ToastDropDownContainerType) => {
  // const { header_title, data } = dropDownData

  const el = dropDownData?.data?.map((item, index) => (
    <StyledListItem key={index}>
      <StyledListItemText>{item.value}</StyledListItemText>
      <StyledListItemText secondary>{item.info}</StyledListItemText>
    </StyledListItem>
  ))

  return (
    <StyledDropDownContent>
      <StyledContentHeader>{dropDownData?.header_title}</StyledContentHeader>
      <StyledDivider />
      <StyledList>{el}</StyledList>
    </StyledDropDownContent>
  )
}

const ToastBanner = ({
  type,
  dropDownData,
  title = 'N/A',
  menuType,
  description,
  buttonOption = false,
}: ToastBannerType) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [dropdownDataArr] = useState<dataTypes[]>(dropDownData?.data || [])
  const contentColor = type === 'warning' ? 'var(--color-transparent-black-05)' : '#FFFFFF'

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setShowContent(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setShowContent(prevState => !prevState)
  }

  return (
    <>
      {menuType === 'dropDown' && (
        <StyledMainWrapper ref={dropdownRef}>
          <StyledMainView onClick={toggleDropdown} showDropDown={showContent} type={type}>
            <ArrowRight color={contentColor} />
            <StyledHeading color={contentColor}>{title}</StyledHeading>
          </StyledMainView>
          {showContent && dropdownDataArr.length > 0 && (
            <ToastDropDownContainer dropDownData={dropDownData} />
          )}
        </StyledMainWrapper>
      )}
      {menuType === 'insideContent' && (
        <StyledMainWrapper>
          <StyledMainViewEdit showDropDown={showContent} type={type}>
            <StyledSvgContainer onClick={toggleDropdown}>
              <ArrowRight color={'#fff'} />
            </StyledSvgContainer>
            <StyledTextContainer>
              <StyledHeadingPrimary>{title}</StyledHeadingPrimary>
              <StyledContentDescription isExpanded={showContent} onClick={toggleDropdown}>
                {description}
              </StyledContentDescription>
            </StyledTextContainer>
            {buttonOption && (
              <StyledButton onClick={buttonOption?.button_func} size='small'>
                {buttonOption?.button_title}
              </StyledButton>
            )}
          </StyledMainViewEdit>
        </StyledMainWrapper>
      )}
    </>
  )
}

const StyledMainWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 250px;
  width: 100%;
`

const StyledButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.6) !important;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
  width: -webkit-fill-available;
`

const StyledDropDownContent = styled.div`
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: calc(100% - 20px);
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  padding: 21px 12px;
  margin: 20px 10px;
`

const StyledMainView = styled.div<{ showDropDown?: boolean; type?: string }>`
  padding: 13px 23px;
  height: auto;
  min-height: 60px;
  display: flex;
  background: ${p =>
    p.type === 'negative'
      ? 'var(--color-background-core-negative)'
      : p.type === 'warning'
      ? 'var(--color-background-core-warning)'
      : 'var(--color-transparent-black-05)'};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 21px;
  cursor: pointer;
  svg {
    transform: ${p => (p.showDropDown ? 'rotate(90deg)' : 'rotate(0deg)')};
    min-width: 10px;
  }
`

const StyledSvgContainer = styled.div`
  padding: 4px;
  padding-right: 0;
`
const StyledMainViewEdit = styled(StyledMainView)<{ showDropDown?: boolean; type?: string }>`
  ${({ showDropDown }) =>
    showDropDown &&
    `
align-items: start;
svg {
  margin-top: 10px;
}
`}
`

const StyledHeading = styled.p<{ color?: string }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${p => p.color};
`

const StyledContentHeader = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`

const StyledDivider = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  height: 1px;
  width: 100%;
  margin-top: 10px;
`

const StyledList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-height: 300px;
  overflow: auto;
  padding-right: 10px;
`
const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledListItemText = styled.p<{ secondary?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${p => (p.secondary ? `var(--color-content-tertiary)` : '#ffffff')};
`

const StyledContentDescription = styled.p<{ isExpanded?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  ${({ isExpanded }) =>
    isExpanded &&
    `
    white-space: normal;

    `}
`

const StyledHeadingPrimary = styled.p`
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const StyledTextContainer = styled.div`
  max-width: 60%;
`

export default ToastBanner
