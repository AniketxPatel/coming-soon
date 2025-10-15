export async function submitToWaitlist(email: string, local = false) {
    const url = local
        ? "/api/test-waitlist" // local test
        : "https://restapi-starter-dtsr9.sevalla.app/api/waitlist/join"; // production

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Waitlist submission failed");

        console.log(local ? "Local submission success:" : "Production submission success:", data);
        return data;
    } catch (err) {
        console.error(local ? "Local waitlist error:" : "Production waitlist error:", err);
        return null;
    }
}
