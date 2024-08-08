import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import { AUTH_ROUTES } from "./constants/routes";
import SignUp from "./pages/Auth/SignUp";
import AuthLayout from "./shared/layout/AuthLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import DashboardLayout from "./shared/layout/DashboardLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={AUTH_ROUTES.LOGIN} />,
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: AUTH_ROUTES.LOGIN,
          element: <Login />,
        },
        {
          path: AUTH_ROUTES.SIGN_UP,
          element: <SignUp />,
        },
        {
          path: AUTH_ROUTES.FORGOT_PASSWORD,
          element: <ForgotPassword />,
        },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Login />,
        },
        {
          path: AUTH_ROUTES.SIGN_UP,
          element: <SignUp />,
        },
        {
          path: AUTH_ROUTES.FORGOT_PASSWORD,
          element: <ForgotPassword />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
