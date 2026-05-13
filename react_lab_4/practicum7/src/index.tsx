import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import List from "./list/List";
import Main from "./main/Main";
import Building from "./building/Building";
import GroupGrid from "./chart/components/GroupGrid";
import { countries } from "./chart/groupdata";
import Chart from "./chart/Chart";
const router = createBrowserRouter([
  {
    index: true,
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/building/:id",
    element: <Building />,
  },
  {
    path: "/diagramm",
    element: <Chart />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
