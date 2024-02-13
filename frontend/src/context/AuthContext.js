import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(["sessionId"]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (cookies.sessionId) {
      setUser(true);
    }
  }, []);

  const login = ({ username, pass }) => {
    if (username === "fidela" && pass === "12345") setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
