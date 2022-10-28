import CredentialAdmin from "./CredentialAdmin";

const CredentialAdminConfig = {
  settings: {
    role: "admin",
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/credentialAdmin",
      component: CredentialAdmin,
    },
  ],
};

export default CredentialAdminConfig;
