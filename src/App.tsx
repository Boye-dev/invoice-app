import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import { AUTH_ROUTES, DASHBOARD_PATHS } from "./constants/routes";
import SignUp from "./pages/Auth/SignUp";
import AuthLayout from "./shared/layout/AuthLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import DashboardLayout from "./shared/layout/DashboardLayout";
import Invoices from "./pages/Invoices";
import NewInvoice from "./pages/NewInvoice";
import EditInvoice from "./pages/EditInvoice";
import Quotation from "./pages/Quotation";
import EditQuotation from "./pages/EditQuotation";
import NewQuotation from "./pages/NewQuotation";

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
          path: DASHBOARD_PATHS.INVOICES,
          element: <Invoices />,
        },
        {
          path: DASHBOARD_PATHS.QUOTATIONS,
          element: <Quotation />,
        },
        {
          path: DASHBOARD_PATHS.QUOTATIONS,
          element: <SignUp />,
        },
        {
          path: DASHBOARD_PATHS.NEW_INVOICE,
          element: <NewInvoice />,
        },
        {
          path: DASHBOARD_PATHS.NEW_QUOTATION,
          element: <NewQuotation />,
        },
        {
          path: `${DASHBOARD_PATHS.EDIT_INVOICE}/:id`,
          element: <EditInvoice />,
        },
        {
          path: `${DASHBOARD_PATHS.EDIT_QUOTATION}/:id`,
          element: <EditQuotation />,
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
