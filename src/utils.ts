import { getJWT } from "./jwt.ts";
import configImport from '../config.json' with { type: "json" }
export const config = configImport as unknown as Config;

export const db = await Deno.openKv("./kv.db");
export const BASE_URL = "https://api.enablebanking.com";

export const DB_KEYS = {
    session: ["session"],
}



export function generateHeaders() {
    return {
        "Authorization": `Bearer ${getJWT()}`,
        "Content-Type": "application/json",
        "psu-ip-address": "10.10.10.10",
        "psu-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    }
}

