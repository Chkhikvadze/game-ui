import ArrowRight from 'assets/old/images/SvgComponents/ArrowRight'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type ToastBannerType = {
  type: 'negative' | 'warning' | 'normal'
}

const ToastDropDownContainer = () => {
  return (
    <StyledDropDownContent>
      <StyledContentHeader>Missing elements</StyledContentHeader>
      <StyledDivider />
      <StyledList>
        <StyledListItem>
          <StyledListItemText>Missing name</StyledListItemText>
          <StyledListItemText secondary>row 5</StyledListItemText>
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText>Missing name</StyledListItemText>
          <StyledListItemText secondary>row 5</StyledListItemText>
        </StyledListItem>
      </StyledList>
    </StyledDropDownContent>
  )
}

const ToastBanner = ({ type }: ToastBannerType) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const contentColor = type === 'warning' ? 'var(--color-transparent-black-05)' : '#FFFFFF'

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setShowDropDown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <StyledMainWrapper ref={dropdownRef}>
      <StyledMainView onClick={toggleDropdown} showDropDown={showDropDown} type={type}>
        <ArrowRight color={contentColor} />

        <StyledHeading color={contentColor}>4 Conflicts</StyledHeading>
      </StyledMainView>
      {showDropDown && <ToastDropDownContainer />}
    </StyledMainWrapper>
  )
}

const StyledMainWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 250px;
  width: 100%;
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
  max-height: 60px;
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
  }
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

export default ToastBanner
