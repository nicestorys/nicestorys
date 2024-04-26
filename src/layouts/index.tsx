
import React from "react";
import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";

/**
 * The main application layout.
 */
export function MainLayout(): JSX.Element {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

/**
 * The minimal app layout to be used on pages such Login/Signup,
 * Privacy Policy, Terms of Use, etc.
 */
export function BaseLayout(): JSX.Element {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
