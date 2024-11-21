// deno-lint-ignore-file no-case-declarations
import { accounts, balance, transactions } from "./accounts.ts";
import { getSession } from "./http.ts";
import { getJWT } from "./jwt.ts";
import { getSessionInfo, sessions } from "./sessions.ts";
import { db } from "./utils.ts";


console.log(Deno.args)

switch (Deno.args[0]) {
    case "accounts":
        accounts(Deno.args.slice(1));
        break;
    case "sessions":
        sessions(Deno.args.slice(1));
        break;
}

// console.log(await db.get(["session"]))

// db.set(["sessions", "123"], {test: "test"})
// db.set(["sessions", "456"], {test: "test2"})

// const entries = await db.get(["session"])
// console.log(entries)

// getSessionInfo("324")

