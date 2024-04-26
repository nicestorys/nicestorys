import React from 'react';
import { createElement } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BaseLayout, MainLayout, } from './layouts'
import { RootError } from './components/error'
import "./client/main.css";

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      { lazy: () => import('./routes/index'), index: true },
      { path: "login", lazy: () => import("./routes/login") },
    ],
  },
  {
    path: "dashboard",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      // { index: true, element: <Navigate to="/dashboard" replace /> },
      { index: true, lazy: () => import("./routes/dashboard") },
    ],
  },
]);

export function Root(): JSX.Element {
  return createElement(RouterProvider, { router });
}
