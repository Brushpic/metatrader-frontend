const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "example-component",
        title: "Example",
        translate: "EXAMPLE",
        type: "item",
        icon: "whatshot",
        url: "/example",
      },
      {
        id: "userAdmin-component",
        title: "Manage users",
        translate: "UserManage",
        type: "item",
        icon: "whatshot",
        url: "/userAdmin",
      },
      {
        id: "credentialAdmin-component",
        title: "Manage Credentials",
        translate: "CredentialManage",
        type: "item",
        icon: "whatshot",
        url: "/credentialAdmin",
      },
      {
        id: "accountList-component",
        title: "Account List",
        translate: "AccountList",
        type: "item",
        icon: "whatshot",
        url: "/accountList",
      },
    ],
  },
];

export default navigationConfig;
