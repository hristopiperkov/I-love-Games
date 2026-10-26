import { useEffect, useState } from "react";
import request from "../../utils/request";
import CommentItem from "./comment-item/CommentItem";

export default function CommentList({ gameId, refresh, accessToken }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        request(`/comments?game_id=eq.${encodeURIComponent(gameId)}&order=created_at.desc`, "GET", null, {
            signal: controller.signal,
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        })
            .then(result => {
                setComments(result ?? []);
                setError(null);
            })
            .catch(err => {
                if (err.name !== "AbortError") setError(err.message);
            });
        return () => controller.abort();
    }, [gameId, refresh, accessToken]);

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            {error ? (
                <p role="alert">{error}</p>
            ) : comments.length ? (
                <ul>{comments.map(comment => <CommentItem key={comment.id} {...comment} />)}</ul>
            ) : (
                <p className="no-comment">No comments.</p>
            )}
        </div>
    );
}
