import { Route, Routes } from "react-router";
import Catalog from "./components/Catalog/Catalog";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import GameDetails from "./components/game-details/GameDetails";
import GameCreate from "./components/game-create/GameCreate";
import Register from "./components/register/Register";
import { useState } from "react";
import Login from "./components/login/Login";

export default function App() {
  const [user, setUser] = useState(null);

  const userAuthHandler = (userData) => {
    setUser(userData);
  };

  return (
    <>
      <Header />

      {user && <p>Welcome, {user.email}!</p>}

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/register" element={<Register onRegister={userAuthHandler} />} />
          <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
