import { Route as Router, Routes } from "react-router-dom"
import About from "./pages/About"

import Channels from "./pages/Channels"
import Create from "./pages/Create"
import Doc from "./pages/Doc"

import Home from "./pages/Home"
import Logs from "./pages/Logs"
import Saved from "./pages/Saved"
import Settings from "./pages/Settings"
import Teams from "./pages/Teams"
import Wallets from "./pages/Wallets"
import { PrivateRoute, PublicRoute } from "oldComponents/atoms/routerProviders"
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  TwoFAuthentication,
} from "pages/Auth"
import ApiKeys from "pages/ApiKeys/ApiKeys"
import Projects from "pages/Project/Projects"
import DeleteConfirmationModal from "oldComponents/modals/DeleteConfirmationModal"
import EditProject from "pages/Project/EditProject"
import MainComponent from "pages/MainComponent"
import ChangePassword from "pages/ChangePassword"
import Account from "pages/Account"
import Contract from "pages/Contract"

import { AuthContext } from "contexts"
import { useContext } from "react"
import Loader from "atoms/Loader"
import ManageUsers from "pages/Admin/ManageUsers"
import CreateUser from "pages/Admin/CreateUser"
import EditUser from "pages/Admin/EditUser"
import ViewUser from "pages/Admin/ViewUser"
import UpdateRole from "pages/Admin/UpdateRole"
import AdminRoute from "oldComponents/atoms/routerProviders/AdminRoute"
import UpdatePassword from "pages/UpdatePassword"
// import ManageUsers from "pages/Admin/ManageUsers"

const Route = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <Loader />

  return (
    <div>
      <Routes>
        <>
          {user?.role === "admin" ? (
            <Router element={<AdminRoute />}>
              <Router path="/" element={<ManageUsers />} />
              <Router path="/admin/users/create" element={<CreateUser />} />
              <Router path="/admin/user/edit/:id" element={<EditUser />} />
              <Router path="/admin/user/:id" element={<ViewUser />} />
              <Router
                path="/admin/user/edit/update-role/:id"
                element={<UpdateRole />}
              />
            </Router>
          ) : (
            <Router element={<PrivateRoute />}>
              <Router path="/" element={<Home />} />
              <Router path="channels" element={<Channels />} />
              <Router path="saved" element={<Saved />} />
              <Router path="wallets" element={<Wallets />} />
              <Router path="create" element={<Create />} />
              <Router path="/games" element={<Projects />} />
              <Router path={"change-password"} element={<ChangePassword />} />
              <Router path={"account"} element={<Account />} />

              <Router path="game/:id">
                <Router index element={<EditProject />} />
                <Router
                  path={"collections"}
                  element={<MainComponent value={"Collections"} />}
                />
                <Router path={"contracts"} element={<Contract />} />
              </Router>

              <Router path="api-keys" element={<ApiKeys />} />
              <Router path="settings" element={<Settings />} />
              <Router path="logs" element={<Logs />} />
              <Router path="teams" element={<Teams />} />
              <Router path="doc" element={<Doc />} />
              <Router path="about" element={<About />} />
              <Router
                path="*"
                element={<MainComponent value={"page not found"} />}
              />
            </Router>
          )}
        </>
        <Router element={<PublicRoute />}>
          <Router path="/login" element={<Login />} />
          <Router path="/register" element={<Register />} />
          <Router path="/forgot-password" element={<ForgotPassword />} />
          <Router path="/login/:id" element={<Login />} />
          <Router path="/reset-password/:id" element={<ResetPassword />} />
          <Router path="/authentication/:id" element={<TwoFAuthentication />} />
          <Router path="login/update-password" element={<UpdatePassword />} />
        </Router>

        {/* <Route path="/" element={<PrivateRoute />}>
		 <Route path="/home" element={<Administration />} />
		 <Route path="/dashboard" element={<Administration />} />
		 <Route path="/administration" element={<Administration />} />
		 </Route>       */}
      </Routes>
      <DeleteConfirmationModal />
    </div>
  )
}

export default Route
