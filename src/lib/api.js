const API_BASE = import.meta.env.VITE_API_BASE;

// POST JSON helper
async function postJSON(path, body) {
    // If backend isn't configured, skip silently.
    if (!API_BASE) return { skipped: true };

    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || `Request failed: ${res.status}`);
    return text ? JSON.parse(text) : {};
}

export async function logVisit({ name }) {
    return postJSON("/portfolio-log", { type: "visit", name });
}

export async function logFeedback({ liked }) {
    return postJSON("/portfolio-log", { type: "feedback", liked });
}