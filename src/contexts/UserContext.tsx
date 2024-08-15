import React, { createContext, useContext } from "react";
import useRoleAuthentication from "../hooks/useRoleAuthentication";
import { IUserDecoded } from "../api/Auth";

interface IUserContext {
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  decodedToken?: IUserDecoded;
}
const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, authenticated, setAuthenticated, decodedToken } =
    useRoleAuthentication();
  const contextValue = React.useMemo(
    () => ({
      loading,
      authenticated,
      decodedToken,
      setAuthenticated,
    }),
    [loading, authenticated, decodedToken, setAuthenticated]
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useAdmincontext must be used within a AdmincontextProvider"
    );
  }
  return context;
};
