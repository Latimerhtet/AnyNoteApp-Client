import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { index: true, element: <Home /> },
        { path: "/create", element: <Create /> },
        { path: "/edit/:id", element: <Edit /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
