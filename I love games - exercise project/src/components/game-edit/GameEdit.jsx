
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import request from "../../utils/request";

const initialValues = {
    title: "",
    genre: "",
    activePlayers: "",
    releaseDate: "",
    imgUrl: "",
    summary: ""
};

export default function GameEdit() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(initialValues);

    const changeHandler = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        request(`/games?id=eq.${gameId}`)
            .then(data => {
                if (!data.length) {
                    throw new Error("Game not found");
                }

                setGame({
                    title: data[0].title ?? "",
                    genre: data[0].genre ?? "",
                    activePlayers: data[0].activePlayers ?? "",
                    releaseDate: data[0].releaseDate ?? "",
                    imgUrl: data[0].imgUrl ?? "",
                    summary: data[0].summary ?? ""
                });
            })
            .catch(error => {
                console.error("Error loading game:", error);
            });
    }, [gameId]);

    const editAction = async () => {
        try {
            await request(`/games?id=eq.${gameId}`, "PATCH", {
                ...game,
                activePlayers: Number(game.activePlayers)
            });

            navigate(`/games/${gameId}`);
        } catch (error) {
            console.error("Error updating game:", error);
            alert("Failed to update game. Please try again.");
        }
    };

    return (
        <section id="edit-page">
            <form id="add-new-game" action={editAction}>
                <div className="container">
                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="title"
                            placeholder="Enter game title..."
                            value={game.title}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="Enter game genre..."
                            value={game.genre}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input
                            type="number"
                            id="activePlayers"
                            name="activePlayers"
                            min="0"
                            step="1"
                            placeholder="0"
                            value={game.activePlayers}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={game.releaseDate}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imgUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imgUrl"
                            name="imgUrl"
                            placeholder="Enter image URL..."
                            value={game.imgUrl}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            name="summary"
                            id="summary"
                            rows="5"
                            placeholder="Write a brief summary..."
                            value={game.summary}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <input
                        className="btn submit"
                        type="submit"
                        value="EDIT GAME"
                    />
                </div>
            </form>
        </section>
    );
}
