import React from 'react'
import { useNavigate } from 'react-router-dom'

import Typography from 'oldComponents/atoms/Typography'

import DropdownItem from 'oldComponents/molecules/DropdownItem'
import DropdownMenu from 'oldComponents/molecules/DropdownMenu'

import SorterDownArrow from 'assets/old/images/arrow-down.svg'

import { StyledButton, StyledNavigation } from './HeadingStyle'

import { useTranslation } from 'react-i18next'

const navigationItems = [
  { label: 'Organisation', to: '/settings/organisation' },
  { label: 'Asset Settings', to: '/settings/asset-settings' },
  { label: 'Replacement settings', to: '/settings/replacement-settings' },
  { label: 'Chargers', to: '/settings/chargers' },
  { label: 'Energy demand', to: '/settings/energy-demand' },
  { label: 'Standard costs', to: '/settings/standard-costs' },
  { label: 'Indices', to: '/settings/indices' },
  { label: 'Depreciation', to: '/settings/depreciation' },
  { label: 'Emission', to: '/settings/emission' },
]

const HeadingNavigation = () => {
  const navigate = useNavigate()

  const redirect = (toggle: any, to: string) => () => {
    navigate(to)
    toggle(false)
  }

  const { t } = useTranslation()

  return (
    <StyledNavigation>
      <DropdownMenu
        trigger={
          <StyledButton color="white">
            <Typography ml={7} mr={10} variant="caption">
              {t('jumpTo')}
            </Typography>
            <img src={SorterDownArrow} alt="arrow-icon" />
          </StyledButton>
        }
      >
        {(toggle) => (
          <>
            {navigationItems.map((item, key) => (
              <DropdownItem
                key={key}
                label={item.label}
                to={item.to}
                onClick={redirect(toggle, item.to)}
              />
            ))}
          </>
        )}
      </DropdownMenu>
    </StyledNavigation>
  )
}
export default HeadingNavigation
