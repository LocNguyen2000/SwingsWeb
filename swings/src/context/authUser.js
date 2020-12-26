import React from "react";

export const AuthUserCtx = React.createContext({
  authUser: null,
  setAuthUser: () => {},
});  