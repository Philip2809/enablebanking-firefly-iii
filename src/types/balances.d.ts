export interface Balances {
    balances: Balance[];
}

export interface Balance {
    name:                       string;
    balance_amount:             BalanceAmount;
    balance_type:               string;
    last_change_date_time:      null;
    reference_date:             null;
    last_committed_transaction: null;
}

export interface BalanceAmount {
    currency: string;
    amount:   string;
}
