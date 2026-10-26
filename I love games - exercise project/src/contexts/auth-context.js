import { createContext } from "react";

const AuthContext = createContext({
    accessToken: null,
    user: null,
    isAuthenticated: false,
    register() {},
    login() {},
    logout() {},
});

export default AuthContext;
