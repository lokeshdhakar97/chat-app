"use client";
import React, { useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { AuthContextType } from "@/types";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const contextValue: AuthContextType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
