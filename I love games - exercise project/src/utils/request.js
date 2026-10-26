// Supabase URL and API key are deliberately kept separate from the REST endpoint.
// VITE_API_KEY is supported to match the variable name used in this project.
const EXPECTED_PROJECT_URL = "https://wtqjbplnkqgkwhcxxwja.supabase.co";
const SESSION_KEY = "ilovegames.auth";

function getConfig() {
    const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
    const supabaseUrl = (envUrl || EXPECTED_PROJECT_URL)
        .replace(/\/+$/, "")
        .replace(/\/rest\/v1$/, "");
    const apiKey = (
        import.meta.env.VITE_API_KEY ||
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
        import.meta.env.VITE_SUPABASE_API_KEY ||
        ""
    ).trim();

    if (supabaseUrl !== EXPECTED_PROJECT_URL) {
        throw new Error(
            `Wrong Supabase project URL. This app is configured for ${EXPECTED_PROJECT_URL}. ` +
            "Check VITE_SUPABASE_URL in .env.local and restart Vite."
        );
    }

    if (!apiKey || apiKey.startsWith("REPLACE_") || apiKey.startsWith("YOUR_")) {
        throw new Error(
            "Missing Supabase API key. Set VITE_API_KEY in the .env.local file next to package.json, " +
            "using the Publishable key from your Supabase project's Settings > API Keys, then restart Vite."
        );
    }

    // Supabase currently accepts publishable keys or legacy JWT-based anon keys
    // for use in the browser. An arbitrary random string is not a Supabase API key.
    const isPublishable = apiKey.startsWith("sb_publishable_");
    const isLegacyAnon = /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(apiKey);
    if (!isPublishable && !isLegacyAnon) {
        throw new Error(
            "VITE_API_KEY is not a Supabase browser API key. Copy the Publishable key " +
            "(starts with sb_publishable_) from Settings > API Keys in project wtqjbplnkqgkwhcxxwja. " +
            "The previously provided short key cannot authenticate to Supabase."
        );
    }

    return { supabaseUrl, apiKey };
}

async function baseRequest(segment, path = "/", method = "GET", data = null, opts = {}) {
    const { supabaseUrl, apiKey } = getConfig();
    const headers = new Headers(opts.headers || {});
    headers.set("apikey", apiKey);

    // Send the user's JWT with authenticated requests (Auth APIs set this explicitly).
    if (segment === "/rest/v1") {
        headers.set("Prefer", "return=representation");
    }
    if (data !== null && data !== undefined) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${supabaseUrl}${segment}${path}`, {
        ...opts,
        method,
        headers,
        ...(data !== null && data !== undefined ? { body: JSON.stringify(data) } : {}),
    });

    const raw = await response.text();
    let result = null;
    if (raw) {
        try {
            result = JSON.parse(raw);
        } catch {
            result = raw;
        }
    }

    if (!response.ok) {
        const detail = result && typeof result === "object"
            ? (result.msg || result.message || result.error_description || result.error || result.hint)
            : result;
        throw new Error(detail || `Supabase request failed (${response.status})`);
    }
    return result;
}

export default function request(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest("/rest/v1", path, method, data, opts);
}

export function authRequest(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest("/auth/v1", path, method, data, opts);
}

export function getSavedAccessToken() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
        return saved?.access_token || null;
    } catch {
        return null;
    }
}

// Retained for compatibility with the original project. The Storage bucket
// 'images' must exist and allow uploads for this optional helper to work.
export async function uploadFile(fileName, file, accessToken = getSavedAccessToken()) {
    const { supabaseUrl, apiKey } = getConfig();
    const encodedName = fileName.split("/").map(encodeURIComponent).join("/");
    const response = await fetch(`${supabaseUrl}/storage/v1/object/images/${encodedName}`, {
        method: "POST",
        headers: {
            apikey: apiKey,
            "Content-Type": file.type || "application/octet-stream",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: file,
    });
    if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || result.error || `Upload failed (${response.status})`);
    }
    return `${supabaseUrl}/storage/v1/object/public/images/${encodedName}`;
}
