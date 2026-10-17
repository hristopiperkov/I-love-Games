import { useEffect, useState } from "react";
import request from "../../utils/request";
import CommentItem from "./comment-item/CommentItem";

export default function CommentsList({
    gameId,
    refresh,
}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchComments = async () => {
            setLoading(true);

            try {
                const result = await request(
                    `/comments?game_id=eq.${gameId}&order=created_at.desc`
                );

                if (!cancelled) {
                    setComments(result ?? []);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchComments();

        return () => {
            cancelled = true;
        };
    }, [gameId, refresh]);

    return (
        <div className="details-comments">
            <h2>Comments:</h2>

            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            {...comment}
                        />
                    ))}
                </ul>
            ) : (
                <p className="no-comment">
                    No comments.
                </p>
            )}
        </div>
    );
}
