const url = "https://wtqjbplnkqgkwhcxxwja.supabase.co/rest/v1/";

export default async function request(path = "/", method = "GET", data = null) {
    const options = {
        method,
        headers: {
            apikey: import.meta.env.VITE_API_KEY,
        }
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(
        `${url}${path.replace(/^\//, "")}`,
        options
    );

    if (!response.ok) {
        const error = await response.text();
        console.error("Supabase error:", error);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
