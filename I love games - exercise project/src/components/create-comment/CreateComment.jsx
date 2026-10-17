import { useState } from "react";
import request from "../../utils/request";

export default function CreateComment({
    user,
    gameId,
    onCommentAdded,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addCommentAction = async (formData) => {
        const text = formData.get("text")?.trim();

        if (!text) {
            alert("Comment cannot be empty!");
            return;
        }

        if (!user?.email) {
            alert("You must be logged in to comment.");
            return;
        }

        const newComment = {
            text,
            author: user.email,
            game_id: gameId,
        };

        setIsSubmitting(true);

        try {
            await request("/comments", "POST", newComment);

            onCommentAdded();

        } catch (error) {
            console.error("Error adding comment:", error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <article className="create-comment">
            <label htmlFor="comment">
                Add new comment:
            </label>

            <form
                className="form"
                action={addCommentAction}
            >
                <textarea
                    id="comment"
                    name="text"
                    placeholder="Comment......"
                    required
                />

                <input
                    className="btn submit"
                    type="submit"
                    value={isSubmitting ? "Sending..." : "Add Comment"}
                    disabled={isSubmitting}
                />
            </form>
        </article>
    );
}
