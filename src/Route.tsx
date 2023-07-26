import { Navigate, Route as Router, Routes } from 'react-router-dom'
import About from './pages/About'

import Channels from './pages/Channels'
import Create from './pages/Create'

import Home from './pages/Home'
import Saved from './pages/Saved'
import Settings from './pages/Settings'
import Teams from './pages/Teams'
// import Wallets from './pages/Wallet/Wallets'
import Contracts from 'pages/Contract/Contracts'
import { ForgotPassword, Login, Register, ResetPassword, TwoFAuthentication } from 'pages/Auth'
import ApiKeys from 'pages/ApiKeys/ApiKeys'
import Games from 'pages/Game/Games'
import EditGame from 'pages/Game/EditGame'
import MainComponent from 'pages/MainComponent'
import ChangePassword from 'pages/ChangePassword'
import Account from 'pages/Account'
import { AuthContext } from 'contexts'
import { useContext, useState } from 'react'
import ManageUsers from 'pages/Admin/ManageUsers'
import CreateUser from 'pages/Admin/CreateUser'
import EditUser from 'pages/Admin/EditUser'
import ViewUser from 'pages/Admin/ViewUser'
import UpdateRole from 'pages/Admin/UpdateRole'

import { PublicRoute, AdminRoute } from 'routes'

import UpdatePassword from 'pages/UpdatePassword'
import Collections from 'pages/Collection/Collections'

import Assets from 'pages/Asset/Assets'
// import EditAsset from 'pages/Asset/EditAsset'
// import ImportAssets from 'pages/Asset/ImportAsset'

// import CollectionRoute from 'routes/CollectionRoute'
// import Properties from 'pages/Property/Properties'
// import EditProperty from 'pages/Property/EditProperty'
import Players from 'pages/Player/Players/Players'

// import ImportImages from 'pages/Asset/ImportImages'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'
import { CheatCode } from 'pages/Auth/Register/CheatCode'
// import ContractRoute from 'routes/ContractRoute'
import ContractView from 'pages/Contract/ContractView'

// import DevelopersRoute from 'routes/DevelopersRoute'
import Log from 'pages/Log/Log'
import Webhook from 'pages/Webhook/Webhook'

import CreatePlayerModal from 'modals/CreatePlayerModal'

// import PlayerInfo from 'pages/Player/PlayerInfo'
// import PlayerAssets from 'pages/Player/PlayerAssets'
// import PlayerTransactions from 'pages/Player/PlayerTransactions'
import ResourcesHub from 'pages/ResourcesHub'
import { useHotkeys } from 'react-hotkeys-hook'
import ContactInfoModal from 'modals/ContactInfoModal'
import CreateGameModal from 'modals/CreateGameModal'
import CreateCollectionModal from 'modals/CreateCollectionModal'
import CreateContractModal from 'modals/CreateContractModal'
// import Spotlight from 'components/Spotlight/Spotlight'
// import SpotlightModal from 'modals/SpotlightModal'
import DeleteConfirmationModal from 'modals/DeleteConfirmationModal'
import CreateAssetModal from 'modals/CreateAssetModal'
import GameTransactions from 'pages/Game/GameTransactions'
import MainRouteLayout from 'routes/MainRouteLayout'
import GameRouteLayout from 'routes/GameRouteLayout'
import Game from 'pages/Game/Game/Game'
import DevelopersRouteLayout from 'routes/DevelopersRouteLayout'
import CommandMenu from 'components/CommandMenu/CommandMenu'
import RootLayout from 'routes/RootLayout'
import AIChat from 'modals/AIChatModal/AIChat'
import ChatRouteLayout from 'routes/ChatRouteLayout'

const Route = () => {
  const { user, loading } = useContext(AuthContext)
  const [theme] = useState(defaultTheme)
  const [cmdkOpen, setCmdkOpen] = useState(false)

  useHotkeys('ctrl+enter, meta+k', event => {
    event.preventDefault()
    setCmdkOpen(true)
    return false
  })

  if (loading) return <WelcomeLoader />

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <>
          {user?.role === 'admin' ? (
            <Router element={<AdminRoute />}>
              <Router path='/' element={<ManageUsers />} />
              <Router path='/admin/users/create' element={<CreateUser />} />
              <Router path='/admin/user/edit/:id' element={<EditUser />} />
              <Router path='/admin/user/:id' element={<ViewUser />} />
              <Router path='/admin/user/edit/update-role/:id' element={<UpdateRole />} />
            </Router>
          ) : (
            // <Router>
            <Router element={<RootLayout />}>
              <Router element={<MainRouteLayout />}>
                <Router path='/' element={<Home />} key={document.location.href} />
                <Router path='game' element={<Games />} key={document.location.href} />
                <Router path='teams' element={<Teams />} key={document.location.href} />
                <Router path='channels' element={<Channels />} key={document.location.href} />
                {/* <Router path='developers' element={<Navigate to={'api-keys'} />} /> */}

                {/* // disabled routes  */}
                <Router path='saved' element={<Saved />} key={document.location.href} />
                {/* <Router path='wallets' element={<Wallets />} /> */}
                <Router path='create' element={<Create />} key={document.location.href} />
                <Router
                  path='change-password'
                  element={<ChangePassword />}
                  key={document.location.href}
                />
                <Router path='account' element={<Account />} key={document.location.href} />
                <Router path='api-keys' element={<ApiKeys />} key={document.location.href} />
                <Router path='settings' element={<Settings />} key={document.location.href} />
                {/* <Router path='logs' element={<Logs />} /> */}
                {/* <Router path='docs' element={<Doc />} /> */}
                <Router path='about' element={<About />} key={document.location.href} />
                <Router path='logs' element={<Log />} key={document.location.href} />
                <Router path='log/:id' element={<Log />} key={document.location.href} />
                <Router path='successful/:id' element={<Log />} key={document.location.href} />
                <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
                <Router path='webhook' element={<Webhook />} key={document.location.href} />
              </Router>

              <Router path={'copilot'} element={<ChatRouteLayout />} key={document.location.href}>
                <Router index element={<AIChat />} key={document.location.href} />
              </Router>

              <Router path={'game/:gameId'} element={<GameRouteLayout />}>
                <Router index element={<Game />} key={document.location.href} />
                <Router path={'general'} element={<EditGame />} key={document.location.href} />
                <Router
                  path={'resources'}
                  element={<ResourcesHub />}
                  key={document.location.href}
                />
                <Router
                  path={'collections'}
                  element={<Collections />}
                  key={document.location.href}
                />
                <Router
                  path={'collections'}
                  element={<Navigate to={'collections'} />}
                  key={document.location.href}
                />
                <Router path={'players'} element={<Players />} key={document.location.href} />
                <Router path={'contracts'} element={<Contracts />} key={document.location.href} />
                <Router
                  path={'transactions'}
                  element={<GameTransactions />}
                  key={document.location.href}
                />
                <Router
                  path={'contracts/:contractId'}
                  element={<ContractView />}
                  key={document.location.href}
                />
                <Router
                  path={'collection/:collectionId'}
                  element={<Assets />}
                  key={document.location.href}
                />
              </Router>
              {/* 
              <Router path={'collection/:collectionId'} element={<GameRouteLayout />}>
                <Router path={'general'} element={<EditCollection />} />
                <Router path={'assets'} element={<Assets />} />
                <Router path={'assets/import'} element={<ImportAssets />} />
                <Router path={'assets/import-images'} element={<ImportImages />} />
                <Router path={'properties'} element={<Properties />} />
              </Router> */}
              {/* <Router path={'assets/:assetId'} element={<EditAsset />} /> */}
              {/* <Router path={'properties/:propertyId'} element={<EditProperty />} /> */}

              {/* <Router path={'player/:playerId'} element={<PlayerRoute />}>
                <Router path={'general'} element={<PlayerInfo />} />
                <Router path={'assets'} element={<PlayerAssets />} />
                <Router path={'transactions'} element={<PlayerTransactions />} />
              </Router> */}

              <Router path={'developers'} element={<DevelopersRouteLayout />}>
                <Router index element={<ApiKeys />} key={document.location.href} />
                <Router path={'webhook'} element={<Webhook />} key={document.location.href} />
                <Router path={'logs'} element={<Log />} key={document.location.href} />
                <Router path={'log/:id'} element={<Log />} key={document.location.href} />
                <Router path={'successful/:id'} element={<Log />} key={document.location.href} />
                <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
                {/* <Router path={'docs'} element={<Doc />} /> */}
              </Router>

              <Router path='*' element={<MainComponent value={'page not found'} />} />
            </Router>
          )}
        </>
        <Router element={<PublicRoute />}>
          <Router path='/login' element={<Login />} />
          <Router path='/register' element={<Register />} />
          <Router path='/forgot-password' element={<ForgotPassword />} />
          <Router path='/login/:id' element={<Login />} />
          <Router path='/reset-password/:id' element={<ResetPassword />} />
          <Router path='/authentication/:id' element={<TwoFAuthentication />} />
          <Router path='/login/update-password' element={<UpdatePassword />} />
          <Router path='/cheat-code' element={<CheatCode />} />
        </Router>
      </Routes>
      {/* {user && <Spotlight />} */}
      <DeleteConfirmationModal />
      {/* <SpotlightModal /> */}
      {/* <AIChatModal /> */}
      <ContactInfoModal />
      <CreateGameModal />
      <CreateCollectionModal />
      <CreatePlayerModal />
      <CreateContractModal />
      <CreateAssetModal />
      <CommandMenu open={cmdkOpen} setCmdkOpen={setCmdkOpen} />

      {/* <NotificationsModal /> */}
    </ThemeProvider>
  )
}

export default Route
