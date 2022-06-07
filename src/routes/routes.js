import React from 'react';

const Layout =  React.lazy(() => import('layouts/Layout/Layout'));

const Products =  React.lazy(() => import('pages/Products/Products'));

// const PermissionDenied =  React.lazy(() => import('views/PermissionDenied/PermissionDenied'));
const PageNotFound =  React.lazy(() => import('pages/PageNotFound/PageNotFound'));

export const routes = [
  {
    path: '/',
    component: Layout,
    routes: [
      // {
      //   path: '/403',
      //   component: PermissionDenied,
      //   exact: true,
      // },
      {
        path: '/products',
        component: Products,
        exact: true,
      },
      {
        path: '/*',
        component: PageNotFound,
      },
    ],
  },
];
