import { Navigate, Route as Router, Routes } from 'react-router-dom'
import About from './pages/About'

import Channels from './pages/Channels'
import Create from './pages/Create'
import Doc from './pages/Doc'

import Home from './pages/Home'
import Logs from './pages/Logs'
import Saved from './pages/Saved'
import Settings from './pages/Settings'
import Teams from './pages/Teams'
// import Wallets from './pages/Wallet/Wallets'
import Contracts from 'pages/Contract/Contracts'
import { ForgotPassword, Login, Register, ResetPassword, TwoFAuthentication } from 'pages/Auth'
import ApiKeys from 'pages/ApiKeys/ApiKeys'
import Projects from 'pages/Project/Projects'
import DeleteConfirmationModal from 'oldComponents/modals/DeleteConfirmationModal'
import EditProject from 'pages/Project/EditProject'
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

import { PrivateRoute, PublicRoute, ProjectRoute, AdminRoute } from 'routes'

import UpdatePassword from 'pages/UpdatePassword'
import Collections from 'pages/Collection/Collections'
import EditCollection from 'pages/Collection/EditCollection'
import Assets from 'pages/Asset/Assets'
// import EditAsset from 'pages/Asset/EditAsset'
import ImportAssets from 'pages/Asset/ImportAsset'

import CollectionRoute from 'routes/CollectionRoute'
import Properties from 'pages/Property/Properties'
// import EditProperty from 'pages/Property/EditProperty'
import Players from 'pages/Player/Players/Players'
import EditPlayer from 'pages/Player/EditPlayer'
import ImportImages from 'pages/Asset/ImportImages'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
import WelcomeLoader from 'components/Loader/WelcomeLoader'
import CheatCode from 'pages/Auth/Register/CheatCode'
import ContractRoute from 'routes/ContractRoute'
import ContractView from 'pages/Contract/ContractView'
import Developers from 'pages/Developers/Developers'
import DevelopersRoute from 'routes/DevelopersRoute'
import Log from 'pages/Log/Log'
import Webhook from 'pages/Webhook/Webhook'
import PlayerRoute from 'routes/PlayerRoute/PlayerRoute'
import PlayerAssets from 'pages/Player/EditPlayer/PlayerAssets'
import PlayerTransactions from 'pages/Player/EditPlayer/PlayerTransactions'

// import ProjectRoute from "oldComponents/atoms/routerProviders/GameRoute";
// import ManageUsers from "pages/Admin/ManageUsers"

const Route = () => {
  const { user, loading } = useContext(AuthContext)
  const [theme] = useState(defaultTheme)

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
            <Router>
              <Router element={<PrivateRoute />}>
                <Router path='/' element={<Home />} />
                <Router path='game' element={<Projects />} />
                <Router path='teams' element={<Teams />} />
                <Router path='channels' element={<Channels />} />
                <Router path='developers' element={<Navigate to={'api-keys'} />} />

                {/* // disabled routes  */}
                <Router path='saved' element={<Saved />} />
                {/* <Router path='wallets' element={<Wallets />} /> */}
                <Router path='create' element={<Create />} />
                <Router path='change-password' element={<ChangePassword />} />
                <Router path='account' element={<Account />} />
                <Router path='api-keys' element={<ApiKeys />} />
                <Router path='settings' element={<Settings />} />
                <Router path='teams' element={<Teams />} />
                <Router path='logs' element={<Logs />} />
                <Router path='doc' element={<Doc />} />
                <Router path='about' element={<About />} />
                <Router path='developers/logs' element={<Log />} />
                <Router path='developers/log/:id' element={<Log />} />
                <Router path='developers/webhook' element={<Webhook />} />
              </Router>

              <Router path={'game/:projectId'} element={<ProjectRoute />}>
                <Router path={'general'} element={<EditProject />} />
                <Router path={'collections'} element={<Collections />} />
                <Router path={'collections'} element={<Navigate to={'collections'} />} />
                <Router path={'players'} element={<Players />} />
                {/* <Router path={'players/:playerId/edit'} element={<EditPlayer />} /> */}
                <Router path={'contracts'} element={<Contracts />} />
                <Router path={'contracts/:contractId'} element={<ContractView />} />
              </Router>

              <Router path={'collection/:collectionId'} element={<CollectionRoute />}>
                <Router path={'general'} element={<EditCollection />} />
                <Router path={'assets'} element={<Assets />} />
                <Router path={'assets/import'} element={<ImportAssets />} />
                <Router path={'assets/import-images'} element={<ImportImages />} />
                {/* <Router path={'assets/:assetId'} element={<EditAsset />} /> */}
                <Router path={'properties'} element={<Properties />} />
                {/* <Router path={'properties/:propertyId'} element={<EditProperty />} /> */}
              </Router>

              <Router path={'player/:playerId'} element={<PlayerRoute />}>
                <Router path={'general'} element={<EditPlayer />} />
                <Router path={'assets'} element={<PlayerAssets />} />
                <Router path={'transactions'} element={<PlayerTransactions />} />
              </Router>

              <Router path={'developers'} element={<DevelopersRoute />}>
                <Router path={'api-keys'} element={<ApiKeys />} />
                <Router path={'webhook'} element={<Webhook />} />
                <Router path={'logs'} element={<Log />} />
                <Router path={'logs/:id'} element={<Log />} />
              </Router>

              {/*<Router path={'game'} element={<ProjectRoute/>}>*/}
              {/*<Router path={':projectId/*'}>*/}
              {/*  <Router element={<EditProject/>}/>*/}
              {/*  <Router path={'collections'} element={<Navigate to={'collections'} replace/>}/>*/}

              {/*</Router>*/}

              {/*</Router>*/}

              {/*<Router  path={'collection/:id'} element={<GameRoute />}>*/}
              {/*<Router index element={<EditCollection/>}/>*/}
              {/*<Router path={'asset'} element={<Assets/>}/>*/}
              {/*<Router path={'properties'} element={<MainComponent value={'Properties'}/>}/>*/}
              {/*</Router>*/}
              {/*<Router path={'asset/:id'} element={<EditAsset/>}/>*/}
              {/*<Router path={'collection/:id'}>*/}
              {/*<Router index element={<EditCollection/>}/>*/}
              {/*<Router element={<MainComponent value={'asset'}/>}/>*/}
              {/*</Router>*/}

              {/*<Router path={"collection/:collectionId"} element={<EditCollection/>}/>*/}

              {/*<Router path="collection/:collectionId">*/}
              {/*<Router index element={<EditCollection/>}/>*/}
              {/*<Router path={"contracts"} element={<Contract/>}/>*/}
              {/*<Router path={"asset"} element={<MainComponent value={'assetss'}/>}/>*/}
              {/*</Router>*/}

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
          <Router path='login/update-password' element={<UpdatePassword />} />
          {/* <Router path='/welcome-page' element={<WelcomeLoader />} /> */}
          <Router path='/cheat-code' element={<CheatCode />} />
        </Router>

        {/* <Route path="/" element={<PrivateRoute />}>
		 <Route path="/home" element={<Administration />} />
		 <Route path="/dashboard" element={<Administration />} />
		 <Route path="/administration" element={<Administration />} />
		 </Route>       */}
      </Routes>
      <DeleteConfirmationModal />
    </ThemeProvider>
  )
}

export default Route
