import AccountList from "./AccountList";

const AccountListConfig = {
  settings: {
    role: "user",
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
