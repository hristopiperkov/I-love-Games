import request from "../utils/request";

export function create(data, accessToken) {
    return request("/comments", "POST", data, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
}
