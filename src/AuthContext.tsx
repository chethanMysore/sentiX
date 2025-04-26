/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { createContext, useState, useContext } from "react";
import { UserRoles } from "@/constants/DefaultValues";

interface AuthProps {
  authState: {
    authenticated: boolean | null;
    username: string | null;
    role: UserRoles | null;
  };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    username: string | null;
    role: UserRoles | null;
  }>({ authenticated: null, username: null, role: null });
  const login = (username: string, password: string) => {
    switch (username) {
      case UserRoles.USER: {
        setAuthState({
          authenticated: true,
          username: username,
          role: UserRoles.USER,
        });
        break;
      }
      case UserRoles.ADMIN: {
        setAuthState({
          authenticated: true,
          username: username,
          role: UserRoles.ADMIN,
        });
        break;
      }
      default: {
        alert("Invalid Username");
      }
    }
  };
  const logout = () => {
    setAuthState({
      authenticated: false,
      username: null,
      role: null,
    });
  };
  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
