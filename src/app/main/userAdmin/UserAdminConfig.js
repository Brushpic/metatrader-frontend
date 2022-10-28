import UserAdmin from "./UserAdmin";

const UserAdminConfig = {
  settings: {
    role: "admin",
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
