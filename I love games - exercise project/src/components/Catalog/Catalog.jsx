import { useContext, useEffect, useState } from "react";
import GameCard from "../game-card/GameCard";
import { gameApi } from "../../api";
import AuthContext from "../../contexts/auth-context";

export default function Catalog() {
    const { accessToken } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        gameApi.getAll(accessToken)
            .then(result => {
                if (active) {
                    setGames(result ?? []);
                    setError(null);
                }
            })
            .catch(err => {
                if (active) setError(err.message);
            });
        return () => { active = false; };
    }, [accessToken]);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {error ? (
                    <p role="alert">{error}</p>
                ) : games.length > 0 ? (
                    games.map(game => <GameCard key={game.id} {...game} />)
                ) : (
                    <h3 className="no-articles">No Added Games Yet</h3>
                )}
            </div>
        </section>
    );
}
