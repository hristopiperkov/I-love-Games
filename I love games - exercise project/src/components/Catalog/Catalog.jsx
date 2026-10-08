import { useEffect, useState } from "react";
import request from "../../utils/request";
import GameCard from "../game-card/GameCard";

export default function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request("/games")
      .then(setGames)
      .catch((err) => console.error("Failed to fetch games:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="catalog-page">
      <h1>Catalog</h1>

      {loading ? (
        <p>Loading games...</p>
      ) : games.length > 0 ? (
        <div className="catalog-container">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      ) : (
        <h3 className="no-articles">No Added Games Yet</h3>
      )}
    </section>
  );
}
