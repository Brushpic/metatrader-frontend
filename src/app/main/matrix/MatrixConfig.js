/**
 * Lazy load Example
 */

import React from "react";

const MatrixConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/matrix/:login",
      component: React.lazy(() => import("./Matrix")),
    },
  ],
};

export default MatrixConfig;
