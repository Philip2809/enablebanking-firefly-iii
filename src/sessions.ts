// deno-lint-ignore-file no-case-declarations
import { createSession, deleteSession, getSession, startAuth } from "./http.ts";
import { DB_KEYS, PsuType } from "./types/enums.ts";
import type { CreateSessionResponse } from "./types/session.d.ts";
import { config, db } from "./utils.ts";



// export async function getSessionInfo(sessionId: string) {
//     const dbValue = await db.get(DB_KEYS.session);
//     if (!dbValue?.value) return await newSessionInfo(sessionId);
//     return dbValue.value;
// }

// async function newSessionInfo(sessionId: string) {
//     const session = await getSession(sessionId);
//     await db.set(DB_KEYS.session, session);
//     return session;
// }

export async function sessions(restArgs: string[]) {
    const sessionCommand = restArgs[0];
    let sessionName;
    switch (sessionCommand) {
        case "auth":
            const country = restArgs[1];
            const bankName = restArgs[2];
            sessionName = restArgs[3];
            const sessionTime = restArgs[4]; // optional
            if (!country || !bankName || !sessionName) throw new Error("Please provide country, bank name and session name");
            return authNewSession(country, bankName, sessionName, sessionTime);
        case "delete":
            sessionName = restArgs[1];
            if (!sessionName) throw new Error("Please provide a session name");
            return deleteSessionInfo(sessionName);
        case "list":
            return listAllSessions();
        default:
            throw new Error("Invalid session command");
    }
}

export async function listAllSessions() {
    const dbValue = db.list({ prefix: [DB_KEYS.session] });
    const toPrint = [];
    for await (const entry of dbValue) {
        const sessionName = entry.key[1];
        const session = entry.value as CreateSessionResponse;
        const validUntil = new Date(session.access.valid_until).toLocaleString();
        toPrint.push({ sessionName, id: session.session_id, validUntil });
    }
    console.table(toPrint);
}

export async function authNewSession(country: string, bankName: string, sessionName: string, sessionTime = "1") {
    // const validUntil = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
    const existingSession = await getSessionInfo(sessionName);
    console.log(existingSession);
    if (existingSession) throw new Error("Session with the same name already exists");
    const validUntil = new Date(new Date().getTime() + parseInt(sessionTime) * 24 * 60 * 60 * 1000); // 1 hour
    const startAuthorizationBody = {
        access: {
            valid_until: validUntil.toISOString()
        },
        aspsp: {
            country: country,
            name: bankName
        },
        state: "my_awesome_state",
        redirect_url: config.applicationRedirectUri,
        psu_type: PsuType.personal
    };

    const response = await startAuth(startAuthorizationBody);
    console.log("Please visit the following URL to authenticate:");
    console.log(JSON.stringify(response, null, 2));

    const code = prompt("Please enter the code from the URL:");
    if (!code) throw new Error("No code provided");
 
    const session = await createSession(code);
    await saveSessionInfo(session, sessionName);
    console.log("Session created successfully:");
    console.log(JSON.stringify(session, null, 2));
}

export async function saveSessionInfo(session: CreateSessionResponse, sessionName: string) {
    await db.set([DB_KEYS.session, sessionName], session);
}

export async function deleteSessionInfo(sessionName: string) {
    try {
        const sessionId = await getSessionId(sessionName);
        await deleteSession(sessionId);
    } catch (_) {}
    await db.delete([DB_KEYS.session, sessionName]);
}

export async function getSessionId(sessionName: string) {
    const session = await getSessionInfo(sessionName);
    if (!session) throw new Error("Session not found");
    return session.session_id;
}

export async function getSessionInfo(sessionName: string) {
    const dbValue = await db.get([DB_KEYS.session, sessionName]);
    // const dbValue = await db.get(["session"]);
    if (!dbValue?.value) return undefined;
    const session = dbValue.value as CreateSessionResponse;

    const valid_until = new Date(session.access.valid_until);
    if (valid_until < new Date()) throw new Error("Session expired");

    return session;
}