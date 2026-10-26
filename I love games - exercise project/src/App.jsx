import { useCallback, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Catalog from "./components/Catalog/Catalog";
import GameDetails from "./components/game-details/GameDetails";
import GameCreate from "./components/game-create/GameCreate";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import GameEdit from "./components/game-edit/GameEdit";
import { authApi } from "./api";
import AuthContext from "./contexts/auth-context";

const SESSION_KEY = "ilovegames.auth";

function getSavedAuth() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
        return saved?.access_token && saved?.user ? saved : null;
    } catch {
        return null;
    }
}

export default function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(getSavedAuth);

    const saveAuth = (session) => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setAuth(session);
    };

    const register = async (userData) => {
        const result = await authApi.register(userData);
        // Supabase can return a user without a session when email confirmation is on.
        const session = result?.session?.access_token ? result.session : result;
        if (session?.access_token && session?.user) {
            saveAuth(session);
            navigate("/");
        } else {
            alert("Account created. Confirm your email if required, then log in.");
            navigate("/login");
        }
    };

    const login = async (userData) => {
        const result = await authApi.login(userData);
        if (!result?.access_token || !result?.user) {
            throw new Error("Login did not return a valid session.");
        }
        saveAuth(result);
        navigate("/");
    };

    // Stable callback: prevents repeated logout requests when the route re-renders.
    const logout = useCallback(async () => {
        const current = getSavedAuth();
        try {
            if (current?.access_token) await authApi.logout(current.access_token);
        } catch (error) {
            console.error("Remote logout failed:", error);
        } finally {
            sessionStorage.removeItem(SESSION_KEY);
            setAuth(null);
        }
    }, []);

    const isAuthenticated = Boolean(auth?.access_token);
    const contextValue = {
        accessToken: auth?.access_token ?? null,
        user: auth?.user ?? null,
        isAuthenticated,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            <Header isAuthenticated={isAuthenticated} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register onRegister={register} />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
        </AuthContext.Provider>
    );
}
