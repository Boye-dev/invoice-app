import { JwtPayload, jwtDecode } from "jwt-decode";
export interface IUserDecoded extends JwtPayload {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
}
export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};
export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};
export const setAllToken = (token: string, refresh: string) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refresh);
};
export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
export const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};
export function getDecodedRefreshJwt(tkn = ""): IUserDecoded | null {
  try {
    const token = getRefreshToken();
    const t = token || tkn;
    return jwtDecode(t);
  } catch (error) {
    return {} as IUserDecoded;
  }
}
export const getDecodedJwt = (newToken?: string): IUserDecoded | null => {
  const token = getToken();
  if (newToken) {
    const decoded: IUserDecoded = jwtDecode(newToken);
    return decoded;
  }
  if (token) {
    try {
      const decoded: IUserDecoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      removeToken();
      window.location.reload();
    }
  }
  return null;
};
