import { getAccountDetails, getBalances, getSession, getTransactions } from "./http.ts";
import { getSessionId } from "./sessions.ts";

export async function accounts(restArgs: string[]) {
    const sessionName = restArgs[0];
    if (!sessionName) throw new Error("Please provide a session name");
    const sessionId = await getSessionId(sessionName);
    const command = restArgs[1];
    let accountIndex;

    switch (command) {
        case "list":
            console.table(await list(sessionId));
            break;
        case "balance":
            accountIndex = parseInt(restArgs[2]);
            if (accountIndex === undefined) throw new Error("Please provide an account index");
            console.table(await balance(sessionId, accountIndex));
            break;
        case "transactions":
            accountIndex = parseInt(restArgs[2]);
            if (accountIndex === undefined) throw new Error("Please provide an account index");
            console.table(await transactions(sessionId, accountIndex));
            break;
        default:
            throw new Error("Invalid accounts command");
    }
}

export async function list(sessionId: string) {
    const session = await getSession(sessionId);
    const detailsPromises = session.accounts.map(getAccountDetails);
    const details = await Promise.all(detailsPromises);

    return details.map((detail) => {
        return {
            uid: detail.uid,
            details: detail.details,
            name: detail.name,
        }
    });
}

export async function balance(sessionId: string, accountIndex: number) {
    const session = await getSession(sessionId);
    const balances = await getBalances(session.accounts[accountIndex]);

    return balances.balances.map((balance) => {
        return {
            balanceType: balance.balance_type,
            currency: balance.balance_amount.currency,
            amount: balance.balance_amount.amount,
        }
    })
}

export async function transactions(sessionId: string, accountIndex: number) {
    const session = await getSession(sessionId);
    const details = await getTransactions(session.accounts[accountIndex]);

    return details.transactions.map((transaction) => {
        return {
            who: transaction.remittance_information[0] || "N/A",
            amount: transaction.transaction_amount.amount,
            currency: transaction.transaction_amount.currency,
            bookingDate: transaction.booking_date,
            valueDate: transaction.value_date,
        } 
    });
}
