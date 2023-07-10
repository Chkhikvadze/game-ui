import { NavLink } from 'react-router-dom'
import { useCollectionByIdService } from 'services'
import { useGameByIdService } from 'services/useGameService'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

interface UserNamesById {
  [userId: string]: string
}

interface DynamicUserBreadcrumbProps {
  match: {
    params: {
      userId: string
    }
    pathname: string
  }
}

const GetCollectionName = ({ match }: any) => {
  const { data: collectionById }: any = useCollectionByIdService({
    id: match?.params?.collectionId,
  })

  return <span>{collectionById?.name}</span>
}

const GetGameName = ({ match }: any) => {
  const { data: gameById } = useGameByIdService({ id: match.params.gameId })

  const { name } = gameById

  return <span>{name}</span>
}

const routes: any = [
  // games
  { path: '/game', breadcrumb: null },
  { path: '/game/:gameId', breadcrumb: GetGameName },
  { path: '/game/:gameId/home', breadcrumb: null },
  { path: '/game/:gameId/resources', breadcrumb: null },
  { path: '/game/:gameId/collections', breadcrumb: null },
  { path: '/game/:gameId/players', breadcrumb: null },
  { path: '/game/:gameId/collection', breadcrumb: null },
  {
    path: '/game/:gameId/collection/:collectionId',
    breadcrumb: GetCollectionName,
    // props: { someProp: breadcrumbsValue },
  },

  { path: '/developers', breadcrumb: 'Developers' },
  { path: '/developers/logs', breadcrumb: 'Logs' },
  { path: '/developers/webhook', breadcrumb: 'Webhook' },

  // account
  { path: '/account', breadcrumb: 'Profile' },

  // {
  //   path: '/custom-props',
  //   breadcrumb: CustomPropsBreadcrumb,
  //   props: { someProp: 'Hi' },
  // },

  //chat
  { path: '/copilot', breadcrumb: null },
  { path: '/copilot/game', breadcrumb: null },
  { path: '/copilot/collection', breadcrumb: null },
  { path: '/copilot/game/:gameId', breadcrumb: GetGameName },
  { path: '/copilot/collection/:collectionId', breadcrumb: GetCollectionName },
]

type BreadcrumbsProps = {
  onClick?: () => void
}

const Breadcrumbs = ({ onClick }: BreadcrumbsProps) => {
  const breadcrumbs = useBreadcrumbs(routes)

  return (
    <StyledBreadcrumbUl>
      {breadcrumbs.length > 0
        ? breadcrumbs.map(({ match, breadcrumb }) => {
            return (
              <StyledBreadcrumbLi>
                <StyledNavLink key={match.pathname} to={match.pathname} onClick={onClick}>
                  <Button size={Button.sizes.SMALL} kind={Button.kinds.TERTIARY}>
                    <Typography
                      value={breadcrumb}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'rgba(255, 255, 255, 0.80)'}
                    />
                  </Button>
                </StyledNavLink>
                <div className='line' />
              </StyledBreadcrumbLi>
            )
          })
        : breadcrumbs.map(({ match, breadcrumb }) => {
            return (
              <StyledBreadcrumbLi>
                <StyledNavLink key={match.pathname} to={match.pathname} onClick={onClick}>
                  <Button size={Button.sizes.SMALL} kind={Button.kinds.TERTIARY}>
                    <Typography
                      value={breadcrumb}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'rgba(255, 255, 255, 0.80)'}
                    />
                  </Button>
                </StyledNavLink>
              </StyledBreadcrumbLi>
            )
          })}

      {}
    </StyledBreadcrumbUl>
  )
}

export default Breadcrumbs

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
`

const StyledBreadcrumbUl = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  li:last-child {
    div {
      display: none;
    }
  }
`

const StyledBreadcrumbLi = styled.li`
  min-height: 34px;
  display: flex;
  align-items: center;
  a {
    padding: 0 15px;
  }
  .line {
    height: 50%;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
`
