import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import request from "../../utils/request";
import CreateComment from "../create-comment/CreateComment";
import CommentsList from "../comments-list/CommentsList";

export default function GameDetails({ user }) {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [commentsRefresh, setCommentsRefresh] = useState(0);

    useEffect(() => {
        request(`/games?id=eq.${gameId}`)
            .then(games => {
                setGame(games[0] ?? null);
            })
            .catch(error => console.error(error));
    }, [gameId]);

    const deleteGameClickHandler = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm(
            `Are you sure you want to delete ${game.title} game?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await request(`/games?id=eq.${gameId}`, "DELETE");
            navigate("/catalog");
        } catch (error) {
            alert(error.message);
        }
    };

    const onCommentAdded = () => {
        setCommentsRefresh(prev => prev + 1);
    };

    if (!game) {
        return <p>Loading game details or game not found...</p>;
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>

            <div className="info-section">
                <div className="header-and-image">
                    <img
                        className="game-img"
                        src={game.imgUrl}
                        alt={game.title}
                    />

                    <div className="meta-info">
                        <h1 className="game-name">
                            {game.title}
                        </h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{game.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">
                                {game.activePlayers}
                            </span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">
                                {game.releaseDate}
                            </span>
                        </p>
                    </div>

                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {game.summary}
                        </p>
                    </div>
                </div>

                {user && (
                    <div className="buttons">
                        <Link
                            to={`/games/${gameId}/edit`}
                            className="button"
                        >
                            Edit
                        </Link>

                        <button
                            type="button"
                            className="button"
                            onClick={deleteGameClickHandler}
                        >
                            Delete
                        </button>
                    </div>
                )}

                <CommentsList
                    gameId={gameId}
                    refresh={commentsRefresh}
                />
            </div>

            {user && (
                <CreateComment
                    user={user}
                    gameId={gameId}
                    onCommentAdded={onCommentAdded}
                />
            )}
        </section>
    );
}
