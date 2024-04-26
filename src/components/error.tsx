import { useRouteError } from "react-router-dom";
import React from "react";

export function RootError(): JSX.Element {
  const err = useRouteError() as RouteError;

  return (
    <div>
      <p>
        <strong>Error {err.status || 500}</strong>:{" "}
        {err.statusText ?? err.message}
      </p>
    </div>
  );
}

type RouteError = Error & { status?: number; statusText?: string };
