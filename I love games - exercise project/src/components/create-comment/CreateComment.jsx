import { commentApi } from "../../api";

export default function CreateComment({ user, accessToken, gameId, onCreate }) {
    const addCommentAction = async (formData) => {
        const text = formData.get("text")?.trim();
        if (!text) return;

        // public.comments contains text, author and game_id, but NO user_id.
        const newComment = {
            text,
            author: user?.email || "Anonymous",
            game_id: gameId,
        };

        try {
            await commentApi.create(newComment, accessToken);
            onCreate();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <article className="create-comment">
            <label htmlFor="new-comment">Add new comment:</label>
            <form className="form" action={addCommentAction}>
                <textarea id="new-comment" name="text" required placeholder="Comment......" />
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
}
