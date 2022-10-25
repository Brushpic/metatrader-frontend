import AccountList from "./AccountList";

const AccountListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/accountList",
      component: AccountList,
    },
  ],
};

export default AccountListConfig;
