const restUrl = "https://wtqjbplnkqgkwhcxxwja.supabase.co/rest/v1/";
const authUrl = "https://wtqjbplnkqgkwhcxxwja.supabase.co/auth/v1/";

async function baseRequest(url, path = "/", method = "GET", data = null, opts = {}) {
    const options = {
        ...opts,
        method,
        headers: {
            apikey: import.meta.env.VITE_API_KEY,
            ...opts.headers
        }
    };

    if (method !== "GET") {
        options.method = method;
    }
    
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

export default function request(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest(restUrl, path, method, data, opts);
}

export const authRequest = async (path = "/", method = "GET", data = null, opts = {}) => {
    return baseRequest(authUrl, path, method, data, opts);
};