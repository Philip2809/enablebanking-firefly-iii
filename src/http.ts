import type { StartAuthorizationRequest } from "./types/auth.d.ts";
import type { Balances } from "./types/balances.d.ts";
import type { Details } from "./types/details.d.ts";
import type { CreateSessionResponse, HttpGetSession } from "./types/session.d.ts";
import type { Transactions } from "./types/transactions.d.ts";
import { BASE_URL, generateHeaders } from "./utils.ts";

export async function startAuth(body: StartAuthorizationRequest): Promise<StartAuthorizationRequest> {
    const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        headers: generateHeaders(),
        body: JSON.stringify(body),
    });
    return await response.json();
}

export async function createSession(authCode: string): Promise<CreateSessionResponse> {
    const response = await fetch(`${BASE_URL}/sessions`, {
        method: "POST",
        headers: generateHeaders(),
        body: JSON.stringify({ code: authCode }),
    });
    return await response.json();
}

export async function deleteSession(sessionId: string): Promise<void> {
    await fetch(`${BASE_URL}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: generateHeaders(),
    });
}

export async function getSession(sessionId: string): Promise<HttpGetSession> {
    const response = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
      headers: generateHeaders(),
    });
    return await response.json();
}

export async function getAccountDetails(accountId: string): Promise<Details> {
    const response = await fetch(`${BASE_URL}/accounts/${accountId}/details`, {
        headers: generateHeaders(),
    });
    return await response.json();
}

export async function getBalances(accountId: string): Promise<Balances> {
    const response = await fetch(`${BASE_URL}/accounts/${accountId}/balances`, {
        headers: generateHeaders(),
    });
    return await response.json();
}

export async function getTransactions(accountId: string): Promise<Transactions> {
    const response = await fetch(`${BASE_URL}/accounts/${accountId}/transactions`, {
        headers: generateHeaders(),
    });
    return await response.json();
}