import { FaFileInvoice, FaUser, FaUsers } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { DASHBOARD_PATHS } from "./routes";
import { FaCartShopping } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { removeToken } from "../api/Auth";

export const navItems = [
  {
    icon: FaFileInvoice,
    name: "Invoices",
    path: DASHBOARD_PATHS.INVOICES,
  },
  {
    icon: GiReceiveMoney,
    name: "Quatations",
    path: DASHBOARD_PATHS.QUOTATIONS,
  },
  {
    icon: FaUsers,
    name: "Clients",
    path: DASHBOARD_PATHS.CLIENTS,
  },
  {
    icon: FaCartShopping,
    name: "Products",
    path: DASHBOARD_PATHS.PRODUCTS,
  },

  {
    icon: FaUser,
    name: "Profile",
    path: DASHBOARD_PATHS.PROFILE,
    bottom: true,
  },
  {
    icon: LuLogOut,
    name: "Logout",
    onClick: () => {
      removeToken();
      window.location.reload();
    },
    bottom: true,
  },
];
