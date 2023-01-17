import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// import useAdministration from 'pages/Administration/useAdministration'

import { upperFirst } from 'lodash'

import Typography from '../Typography'

import { IconArrowDown } from 'assets/old/images/navbar'

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
  StyledMainUl,
  StyledLink,
  StyledInnerUl,
  StyledTypography,
  StyledIcon,
  StyledWrapper,
  StyledArrowIcon,
  StyledLine,
  StyledNavWrapper,
  StyledVerticalLine,
} from './MenuBarStyle'

const mainColor = '#000'
const mainColorDiff = '#E2E2E2'

const MenuBar = ({ showMenu, onItemClick }: any) => {
  // const { disabled } = useAdministration()
  const disabled = true

  const [toggleMenu, setToggleMenu] = useState({
    fleet: true,
    garages: false,
    fuel: false,
    reports: false,
    planning: false,
  })
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const handleActive = (firstParam: string, secondParam?: string) => {
    if (pathname.split('/')[1] === firstParam) return true
    if (pathname.split('/')[1] === secondParam) return true
    return false
  }

  const clearPage = () => localStorage.removeItem('page')

  return (
    <StyledRoot show={showMenu}>
      <StyledContainer>
        <StyledWrapper show={showMenu}>
          <StyledMainUl>
            {/* HOME */}
            <StyledTypography
              active={handleActive('dashboard')}
              variant={'h5'}
              weight={700}
              color={mainColorDiff}
            >
              <StyledIcon>
                <img src={homeIcon} alt="truck-icon" />
              </StyledIcon>
              <StyledLink to="/">{t('home')}</StyledLink>
            </StyledTypography>

            {/* MY FLEET */}
            <>
              <StyledTypography
                active={handleActive('my-fleet', 'browse-vehicles')}
                onClick={() => setToggleMenu({ ...toggleMenu, fleet: !toggleMenu.fleet })}
                variant={'h5'}
                weight={700}
                color={mainColorDiff}
              >
                <StyledIcon>
                  <img src={truckIcon} alt="truck-icon" />
                </StyledIcon>
                {t('fleet')}
                <StyledArrowIcon
                  toggleMenu={toggleMenu.fleet}
                  src={IconArrowDown}
                  alt="arrow-down"
                />
              </StyledTypography>

              <StyledInnerUl toggle={toggleMenu.fleet}>
                <StyledVerticalLine />
                <StyledNavWrapper toggle={toggleMenu.fleet}>
                  <Typography variant={'h5'} color={mainColor} as={'li'}>
                    <StyledLink to="/my-fleet" onClick={clearPage}>
                      <StyledLine />
                      {t('myFleet')}
                    </StyledLink>
                  </Typography>

                  <Typography mt={20} variant={'h5'} color={mainColor} as={'li'}>
                    <StyledLink to={'/browse-vehicles'}>
                      <StyledLine />
                      {t('vehicleComparison')}
                    </StyledLink>
                  </Typography>

                  {/* <Typography mb={20} mt={20} variant={'h5'} color={mainColor} as={'li'}>
				   <StyledLink to="/vehicle-acquisition" onClick={clearPage}>
				   <StyledLine />
				   Vehicle acquisition
				   </StyledLink>
				   </Typography> */}
                </StyledNavWrapper>
              </StyledInnerUl>
            </>

            {/* GARAGE LOCATIONS */}
            <StyledTypography
              active={handleActive('garage-locations')}
              onClick={() => {
                setToggleMenu({ ...toggleMenu, garages: !toggleMenu.garages })
                clearPage()
              }}
              variant={'h5'}
              weight={700}
              color={mainColorDiff}
            >
              <StyledIcon>
                <img src={locationIcon} alt="truck-icon" />
              </StyledIcon>
              <StyledLink to="/garage-locations">
                {/* {upperFirst(t('garage'))} locations */}
                {t('garageLocations')}
              </StyledLink>
            </StyledTypography>

            {/* FUEL USAGE */}
            <>
              <StyledTypography
                active={handleActive('fuel-usage', 'charging-data')}
                onClick={() => setToggleMenu({ ...toggleMenu, fuel: !toggleMenu.fuel })}
                variant={'h5'}
                weight={700}
                color={mainColorDiff}
              >
                <StyledIcon>
                  <img src={listIcon} alt="truck-icon" />
                </StyledIcon>
                {t('fuel&charging')}
                <StyledArrowIcon
                  toggleMenu={toggleMenu.fuel}
                  src={IconArrowDown}
                  alt="arrow-down"
                />
              </StyledTypography>
              <StyledInnerUl toggle={toggleMenu.fuel}>
                <StyledVerticalLine />
                <StyledNavWrapper toggle={toggleMenu.fuel}>
                  <Typography variant={'h5'} color={mainColor} as={'li'}>
                    <StyledLink to="/fuel-usage" onClick={clearPage}>
                      <StyledLine />
                      {t('fuelUsage')}
                    </StyledLink>
                  </Typography>

                  {/* <Typography mt={20} variant={'h5'} color={mainColor} as={'li'}>
				   <StyledLink to="/charging-data" onClick={clearPage}>
				   <StyledLine />
				   Charging data
				   </StyledLink>
				   </Typography> */}

                  {/* <Typography mt={20} variant={'h5'} color={mainColor} as={'li'}>
				   <StyledLink to="/charger-selection" onClick={clearPage}>
				   <StyledLine />
				   Charger selection
				   </StyledLink>
				   </Typography> */}
                </StyledNavWrapper>
              </StyledInnerUl>
            </>

            {/* PLANNING */}
            {/* <>
			 <StyledTypography
			 active={handleActive('forecasting', 'Budget')}
			 onClick={() => setToggleMenu({ ...toggleMenu, planning: !toggleMenu.planning })}
			 variant={'h5'}
			 weight={700}
			 color={mainColorDiff}
			 >
			 <StyledIcon>
			 <img src={truckIcon} alt="truck-icon" />
			 </StyledIcon>
			 planning
			 <StyledArrowIcon
			 toggleMenu={toggleMenu.planning}
			 src={IconArrowDown}
			 alt="arrow-down"
			 />
			 </StyledTypography>
			 {toggleMenu.planning && (
			 <StyledInnerUl>
			 <StyledVerticalLine />
			 <StyledNavWrapper toggle={toggleMenu.planning}>
			 <Typography variant={'h5'} color={mainColor} as={'li'}>
			 <StyledLink to="/forecasting" onClick={clearPage}>
			 <StyledLine />
			 Forecasting
			 </StyledLink>
			 </Typography>
			 
			 <Typography mt={20} variant={'h5'} color={mainColor} as={'li'}>
			 <StyledLink to={'/browse-vehicles'}>
			 <StyledLine />
			 Budget
			 </StyledLink>
			 </Typography>
			 </StyledNavWrapper>
			 </StyledInnerUl>
			 )}
			 </> */}

            {/* SETTINGS */}
            <StyledTypography
              active={handleActive('settings')}
              variant={'h5'}
              weight={700}
              color={mainColorDiff}
            >
              <StyledIcon>
                <img src={gearIcon} alt="truck-icon" />
              </StyledIcon>
              <StyledLink to="/settings">{t('settings')}</StyledLink>
            </StyledTypography>

            {/* FLEET DYNAMICS */}
            <>
              <StyledTypography
                active={handleActive('fleet-dynamics', 'transition-plan')}
                onClick={() => setToggleMenu({ ...toggleMenu, reports: !toggleMenu.reports })}
                variant={'h5'}
                weight={700}
                color={mainColorDiff}
              >
                <StyledIcon>
                  <img src={reportIcon} alt="truck-icon" />
                </StyledIcon>
                {t('reports')}
                <StyledArrowIcon
                  toggleMenu={toggleMenu.reports}
                  src={IconArrowDown}
                  alt="arrow-down"
                />
              </StyledTypography>
              <StyledInnerUl toggle={toggleMenu.reports}>
                <StyledVerticalLine />
                <StyledNavWrapper toggle={toggleMenu.reports}>
                  <Typography variant={'h5'} color={mainColor} as={'li'}>
                    <StyledLink to="/fleet-dynamics">
                      <StyledLine />
                      {t('fleetDynamics')}
                    </StyledLink>
                  </Typography>

                  <Typography mt={20} variant={'h5'} color={mainColor} as={'li'}>
                    <StyledLink to="/transition-plan">
                      <StyledLine />
                      {t('transition-plans')}
                    </StyledLink>
                  </Typography>
                </StyledNavWrapper>
              </StyledInnerUl>
            </>

            {/* ADMINISTRATION */}
            {disabled && (
              <StyledTypography
                active={handleActive('administration')}
                variant={'h5'}
                weight={700}
                color={mainColorDiff}
              >
                <StyledIcon>
                  <img src={personWorkSpaceIcon} alt="truck-icon" />
                </StyledIcon>
                <StyledLink to="/administration">{t('administration')}</StyledLink>
              </StyledTypography>
            )}
          </StyledMainUl>
        </StyledWrapper>
      </StyledContainer>
    </StyledRoot>
  )
}

export default MenuBar
