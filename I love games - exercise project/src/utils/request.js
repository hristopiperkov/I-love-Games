
const url = "https://wtqjbplnkqgkwhcxxwja.supabase.co/rest/v1/";

export default async function request(
    path = "/",
    method = "GET",
    data = null,
    opts = {}
) {
    const options = {
        ...opts,
        method,
        headers: {
            apikey: import.meta.env.VITE_API_KEY,
            ...opts.headers
        }
    };

    if (data !== null) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(
        `${url}${path.replace(/^\//, "")}`,
        options
    );

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${responseText}`
        );
    }

    return responseText ? JSON.parse(responseText) : null;
}
