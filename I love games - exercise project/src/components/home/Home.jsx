import { useContext, useEffect, useState } from "react";
import request from "../../utils/request";
import AuthContext from "../../contexts/auth-context";
import GameCard from "../game-card/GameCard";

export default function Home() {
    const { accessToken } = useContext(AuthContext);
    const [latestGames, setLatestGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        request("/games?order=created_at.desc&limit=3", "GET", null, {
            signal: controller.signal,
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        })
            .then(data => {
                setLatestGames(data ?? []);
                setError(null);
            })
            .catch(err => {
                if (err.name !== "AbortError") setError(err.message);
            });
        return () => controller.abort();
    }, [accessToken]);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="/images/logo.png" alt="logo" />
            </div>
            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    <div className="home-container">
                        {error ? (
                            <p role="alert">{error}</p>
                        ) : latestGames.length > 0 ? (
                            latestGames.map(game => <GameCard key={game.id} {...game} />)
                        ) : (
                            <p className="no-articles">No games yet</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
