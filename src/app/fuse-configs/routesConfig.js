import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import MatrixConfig from "app/main/matrix/MatrixConfig";
import UserAdminConfig from "app/main/userAdmin/UserAdminConfig";
import CredentialAdminConfig from "app/main/credentialAdmin/CredentialAdminConfig";
import AccountListConfig from "app/main/accountList/AccountListConfig";
import LoginConfig from "app/main/login/LoginConfig";
import LogoutConfig from "app/main/logout/LogoutConfig";
import RegisterConfig from "app/main/register/RegisterConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import Error404Page from "app/main/404/Error404Page";

const routeConfigs = [
  MatrixConfig,
  LoginConfig,
  RegisterConfig,
  LogoutConfig,
  UserAdminConfig,
  CredentialAdminConfig,
  AccountListConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: "/",
    component: () => <Redirect to="/login" />,
  },
  {
    path: "/loading",
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: "/404",
    component: () => <Error404Page />,
  },
  {
    path: "*",
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
