import { FaFileInvoice, FaUser } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { DASHBOARD_PATHS } from "./routes";
import { FaCartShopping } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

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
    onClick: () => {},
    bottom: true,
  },
];
