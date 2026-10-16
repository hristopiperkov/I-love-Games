
import request from "../../utils/request";

export default function CreateComment({ user, gameId }) {

    const addCommentAction = async (formData) => {
        const text = formData.get("text")?.trim();

        if (!text) {
            alert("Comment cannot be empty!");
            return;
        }

        const newComment = {
            text,
            author: user?.email,
            game_id: gameId
        };

        try {
            await request("/comments", "POST", newComment);

            console.log("Comment added successfully!");
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment!");
        }
    };

    return (
        <article className="create-comment">
            <label htmlFor="comment">Add new comment:</label>

            <form className="form" action={addCommentAction}>
                <textarea
                    id="comment"
                    name="text"
                    placeholder="Comment......"
                    required
                />

                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                />
            </form>
        </article>
    );
}
