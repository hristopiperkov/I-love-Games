
import { useState } from "react";
import { useNavigate } from "react-router";
import request from "../../utils/request";

const initialValues = {
    title: "",
    genre: "",
    activePlayers: "",
    releaseDate: "",
    imageUrl: "",
    summary: ""
};

export default function GameCreate() {
    const [values, setValues] = useState(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitAction = async () => {
        if (isSubmitting) return;

        if (Object.values(values).some(value => !String(value).trim())) {
            alert("All fields are required!");
            return;
        }

        const activePlayers = Number(values.activePlayers);

        if (!Number.isSafeInteger(activePlayers) || activePlayers < 0) {
            alert("Active players must be a valid non-negative integer!");
            return;
        }

        setIsSubmitting(true);

        try {
            await request("/games", "POST", {
                title: values.title,
                genre: values.genre,
                imgUrl: values.imageUrl,
                summary: values.summary,
                activePlayers: Number(values.activePlayers),
                releaseDate: values.releaseDate

            });
            navigate("/catalog");
            } catch (error) {
                console.error("Error creating game:", error);
                alert("Failed to create game. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="add-page">
            <form id="add-new-game" action={submitAction}>
                <div className="container">

                    <h1>Add New Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="title"
                            placeholder="Enter game title..."
                            value={values.title}
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
                            value={values.genre}
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
                            value={values.activePlayers}
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
                            value={values.releaseDate}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="Enter image URL..."
                            value={values.imageUrl}
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
                            value={values.summary}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <input
                        className="btn submit"
                        type="submit"
                        value={isSubmitting ? "ADDING..." : "ADD GAME"}
                        disabled={isSubmitting}
                    />

                </div>
            </form>
        </section>
    );
}
