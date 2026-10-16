import { Route, Routes } from "react-router";
import { useCallback, useState } from "react";
import Catalog from "./components/Catalog/Catalog";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import GameDetails from "./components/game-details/GameDetails";
import GameCreate from "./components/game-create/GameCreate";
import GameEdit from "./components/game-edit/GameEdit";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";

export default function App() {
    const [user, setUser] = useState(null);

    const userAuthHandler = (userData) => {
        setUser(userData);
    };

    const userLogoutHandler = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <>
            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/:gameId"element={<GameDetails />} />
                <Route path="/games/create" element={<GameCreate />}/>
                <Route path="/games/:gameId/edit"element={<GameEdit />} />
                <Route path="/register" element={<Register onRegister={userAuthHandler} />} />
                <Route path="/login" element={<Login onLogin={userAuthHandler} />} />
                <Route path="/logout" element={<Logout onLogout={userLogoutHandler} />} />
            </Routes>

            <Footer />
        </>
    );
}
