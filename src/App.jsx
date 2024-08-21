import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./components/Unauthorized";
import { isTokenAuthorized } from "../utils/isLogin";
import isLoginLoader from "../utils/isLogin";
import { UserContext } from "./contexts/UserContext";
const App = () => {
  const { token } = useContext(UserContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { index: true, element: <Home /> },
        { path: "/create", element: <Create />, loader: isLoginLoader },
        { path: "/edit/:id", element: <Edit />, loader: isLoginLoader },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/unauthorized", element: <Unauthorized /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
