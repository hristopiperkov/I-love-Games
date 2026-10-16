import request from "../../utils/request";

export default function CreateComment({
    user,
    gameId,
}) {
    const addCommentAction = async (FormData) => {
        const newComment = {
            text: FormData.get('text'),
            author: 'user?.email',
            game_id: 'gameId'
        }
        await request('/comments', 'POST', )
    };

    return (
        <article className="create-comment">
                <label htmlFor="comment">Add new comment:</label>

                <form className="form" action={addCommentAction}>
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Comment......"
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