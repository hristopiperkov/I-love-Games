import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import request from "../../utils/request";
import { gameApi } from "../../api";
import AuthContext from "../../contexts/auth-context";

const initialValues = {
    title: "",
    genre: "",
    activePlayers: "",
    releaseDate: "",
    imgUrl: "",
    summary: "",
};

export default function GameEdit() {
    const { accessToken, isAuthenticated } = useContext(AuthContext);
    const { gameId } = useParams();
    const [game, setGame] = useState(initialValues);
    const [loadError, setLoadError] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setGame(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const controller = new AbortController();
        request(`/games?id=eq.${encodeURIComponent(gameId)}`, "GET", null, {
            signal: controller.signal,
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        })
            .then(data => {
                if (!data?.[0]) throw new Error("Game not found");
                setGame({ ...initialValues, ...data[0] });
            })
            .catch(error => {
                if (error.name !== "AbortError") setLoadError(error.message);
            });
        return () => controller.abort();
    }, [gameId, isAuthenticated, accessToken]);

    const editAction = async () => {
        try {
            await gameApi.update(gameId, game, accessToken);
            navigate(`/games/${gameId}`);
        } catch (error) {
            alert(error.message);
        }
    };

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (loadError) return <p role="alert">{loadError}</p>;

    return (
        <section id="edit-page">
            <form id="add-new-game" action={editAction}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input required type="text" id="gameName" name="title" placeholder="Enter game title..." value={game.title} onChange={changeHandler} />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input required type="text" id="genre" name="genre" placeholder="Enter game genre..." value={game.genre} onChange={changeHandler} />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input required type="number" id="activePlayers" name="activePlayers" min="0" placeholder="0" value={game.activePlayers} onChange={changeHandler} />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input required type="date" id="releaseDate" name="releaseDate" value={game.releaseDate} onChange={changeHandler} />
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="imgUrl">Image URL:</label>
                        <input required type="url" id="imgUrl" name="imgUrl" placeholder="Enter image URL..." value={game.imgUrl} onChange={changeHandler} />
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea required name="summary" id="summary" rows="5" placeholder="Write a brief summary..." value={game.summary} onChange={changeHandler} />
                    </div>
                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </form>
        </section>
    );
}
