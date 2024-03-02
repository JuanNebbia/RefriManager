import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const axiosInstance = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies(["sessionId", "guest"]);
  const [user, setUser] = useState(false);
  const [guest, setGuest] = useState(false)
  const [logError, setLogError] = useState(false);

  useEffect(() => {
    if (cookies.sessionId) {
      setUser(true);
    }
    if (cookies.guest) {
      setGuest(true)
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
        setGuest(true)
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

  const peekABoo = () => {
    setCookies("guest", true, {
      path: "/",
    });
  }

  const goodNight = () => {
    document.cookie =
      "guest=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setGuest(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, logError, setLogError, guest, setGuest, peekABoo, goodNight }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
