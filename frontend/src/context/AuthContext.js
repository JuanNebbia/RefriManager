import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const axiosInstance = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies(["sessionId"]);
  const [user, setUser] = useState(false);
  const [logError, setLogError] = useState(false);

  useEffect(() => {
    if (cookies.sessionId) {
      setUser(true);
    }
  }, []);

  const login = async (payload) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    try {
      const loginResponse = await axiosInstance.post(
        `${url}/auth/login`,
        payload
      );
      if (loginResponse.data.success) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        setCookies("sessionId", process.env.REACT_APP_SESSION_COOKIE, {
          expires: expirationDate,
          path: "/",
        });
        setUser(true);
      }
    } catch (error) {
      setLogError(true);
      console.log(error);
    }
  };

  const logout = async () => {
    document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setUser(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, logError, setLogError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
