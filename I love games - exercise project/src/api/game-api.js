import request from "../utils/request";

function authOptions(accessToken) {
    return accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
}

// Match the EXACT public.games column names shown in your Supabase database.
function toGameRecord(game) {
    return {
        title: game.title.trim(),
        genre: game.genre.trim(),
        imgUrl: game.imgUrl.trim(),
        summary: game.summary.trim(),
        activePlayers: Number(game.activePlayers),
        releaseDate: game.releaseDate,
    };
}

export function getAll(accessToken) {
    return request("/games?order=created_at.desc", "GET", null, authOptions(accessToken));
}

export function create(data, accessToken) {
    return request("/games", "POST", toGameRecord(data), authOptions(accessToken));
}

export async function remove(gameId, accessToken) {
    const result = await request(`/games?id=eq.${encodeURIComponent(gameId)}`, "DELETE", null, authOptions(accessToken));
    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("Game was not deleted. Check the Supabase RLS delete policy.");
    }
    return result;
}

export async function update(gameId, data, accessToken) {
    // PostgREST updates existing rows with PATCH, not PUT.
    const result = await request(`/games?id=eq.${encodeURIComponent(gameId)}`, "PATCH", toGameRecord(data), authOptions(accessToken));
    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("Game was not updated. Check the Supabase RLS update policy.");
    }
    return result;
}
