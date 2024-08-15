import { UserContextProvider } from "../../contexts/UserContext";
import DashboardLayout from "./DashboardLayout";

const UserLayout = () => {
  return (
    <UserContextProvider>
      <DashboardLayout />
    </UserContextProvider>
  );
};

export default UserLayout;
