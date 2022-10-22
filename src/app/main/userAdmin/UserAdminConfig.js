import UserAdmin from "./UserAdmin";

const UserAdminConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/userAdmin",
      component: UserAdmin,
    },
  ],
};

export default UserAdminConfig;
