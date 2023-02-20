import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { upperFirst } from 'lodash'

// import useAdministration from 'pages/Administration/useAdministration'

import {
  homeIcon,
  truckIcon,
  gearIcon,
  reportIcon,
  locationIcon,
  listIcon,
  personWorkSpaceIcon,
} from 'assets/old/images/CompactMenubar'

import {
  StyledRoot,
  StyledContainer,
  StyledUl,
  StyledIconLi,
  StyledInnerUl,
  StyledTypography,
  StyledLink,
} from './CompactMenubarStyle'
import { T } from 'lodash/fp'

const CompactMenubar = ({ showMenu, onItemClick }: any) => {
  // const { disabled } =  useAdministration()
  const disabled = false
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const handleActive = (firstParam: string, secondParam?: string) => {
    if (pathname.split('/')[1] === firstParam) return true
    if (pathname.split('/')[1] === secondParam) return true
    return false
  }

  return (
    <StyledRoot show={showMenu}>
      <StyledContainer>
        <StyledUl show={showMenu}>
          <StyledIconLi active={handleActive('dashboard')}>
            <img src={homeIcon} alt='home-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/'}>{t('home')}</StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          <StyledIconLi active={handleActive('my-fleet', 'browse-vehicles')}>
            <img src={truckIcon} alt='truck-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/my-fleet'}>{t('myFleet')}</StyledLink>
              </StyledTypography>

              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/browse-vehicles'}>{t('vehicleComparison')}</StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          <StyledIconLi active={handleActive('garage-locations')}>
            <img src={locationIcon} alt='location-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/garage-locations'}>
                  {/* {upperFirst(t('garage'))} locations */}
                  {t('garageLocations')}
                </StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          <StyledIconLi active={handleActive('fuel-usage')}>
            <img src={listIcon} alt='list-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/fuel-usage'}>{t('fuelUsage')}</StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          <StyledIconLi active={handleActive('settings')}>
            <img src={gearIcon} alt='gear-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/settings'}>{t('settings')}</StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          <StyledIconLi active={handleActive('fleet-dynamics', 'transition-plan')}>
            <img src={reportIcon} alt='report-icon' />
            <StyledInnerUl>
              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/fleet-dynamics'}>{t('fleetDynamics')}</StyledLink>
              </StyledTypography>

              <StyledTypography variant={'label'} color='white'>
                <StyledLink to={'/transition-plan'}>{t('transition-plans')}</StyledLink>
              </StyledTypography>
            </StyledInnerUl>
          </StyledIconLi>

          {disabled && (
            <StyledIconLi active={handleActive('administration')}>
              <img src={personWorkSpaceIcon} alt='administration-icon' />
              <StyledInnerUl>
                <StyledTypography variant={'label'} color='white'>
                  <StyledLink to={'/administration'}>{t('administration')}</StyledLink>
                </StyledTypography>
              </StyledInnerUl>
            </StyledIconLi>
          )}
        </StyledUl>
      </StyledContainer>
    </StyledRoot>
  )
}

export default CompactMenubar
