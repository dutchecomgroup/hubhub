"use server";

import { getServerMetrics } from "@/lib/ssh";

const TCG_CONFIG = {
    host: "85.215.182.227",
    username: "root",
    privateKeyPath: process.env.SSH_KEY_TCG || "",
};

const DUTCHTHRIFT_CONFIG = {
    host: "85.215.181.179",
    username: "root",
    privateKeyPath: process.env.SSH_KEY_DUTCHTHRIFT || "",
};

export async function fetchAllHubMetrics() {
    // Use Promise.all to fetch metrics from all servers in parallel
    const [tcgMetrics, dutchthriftMetrics] = await Promise.all([
        getServerMetrics(TCG_CONFIG),
        getServerMetrics(DUTCHTHRIFT_CONFIG),
    ]);

    return {
        tcg: {
            ...tcgMetrics,
            status: tcgMetrics.uptime === "Offline" ? "down" : "up",
        },
        dutchthrift: {
            ...dutchthriftMetrics,
            status: dutchthriftMetrics.uptime === "Offline" ? "down" : "up",
        },
    };
}
