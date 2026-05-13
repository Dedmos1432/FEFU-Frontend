import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./main";
import List from "./list/List";
import Videocard from "./videocard/Videocard";
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
    path: "/videocard/:id",
    element: <Videocard />,
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
