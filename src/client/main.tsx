import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Root } from "../root";
import "./index.css";

const containerEl = document.getElementById("root")!;

hydrateRoot(
  containerEl,
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
