import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "userAdmin-component",
        title: "Manage users",
        translate: "UserManage",
        type: "item",
        icon: "whatshot",
        auth: authRoles.admin,
        url: "/userAdmin",
      },
      {
        id: "credentialAdmin-component",
        title: "Manage Credentials",
        translate: "CredentialManage",
        type: "item",
        icon: "whatshot",
        auth: authRoles.admin,
        url: "/credentialAdmin",
      },
      {
        id: "accountList-component",
        title: "Account List",
        translate: "AccountList",
        type: "item",
        icon: "whatshot",
        auth: authRoles.user,
        url: "/accountList",
      },
    ],
  },
];

export default navigationConfig;
