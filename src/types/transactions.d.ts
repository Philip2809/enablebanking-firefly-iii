export interface Transactions {
    transactions:     Transaction[];
    continuation_key: null;
}

export interface Transaction {
    entry_reference:                            string;
    merchant_category_code:                     null;
    transaction_amount:                         BalanceAfterTransaction;
    creditor:                                   null;
    creditor_account:                           TorAccount | null;
    creditor_agent:                             TorAgent | null;
    debtor:                                     null;
    debtor_account:                             TorAccount | null;
    debtor_agent:                               TorAgent | null;
    bank_transaction_code:                      BankTransactionCode;
    credit_debit_indicator:                     CreditDebitIndicator;
    status:                                     Status;
    booking_date:                               Date;
    value_date:                                 Date;
    transaction_date:                           null;
    balance_after_transaction:                  BalanceAfterTransaction;
    reference_number:                           null;
    remittance_information:                     string[];
    debtor_account_additional_identification:   null;
    creditor_account_additional_identification: null;
    exchange_rate:                              null;
    note:                                       null;
    transaction_id:                             null | string;
}

export interface BalanceAfterTransaction {
    currency: Currency;
    amount:   string;
}

export enum Currency {
    Sek = "SEK",
    Xxx = "XXX",
}

export interface BankTransactionCode {
    description: Description;
    code:        null;
    sub_code:    null;
}

export enum Description {
    Other = "Other",
    Transfer = "Transfer",
}

export enum CreditDebitIndicator {
    Crdt = "CRDT",
    Dbit = "DBIT",
}

export interface TorAccount {
    iban:  Iban;
    other: Other;
}

export enum Iban {
    Se6750000000056062932697 = "SE6750000000056062932697",
}

export interface Other {
    identification: string;
    scheme_name:    SchemeName;
    issuer:         null;
}

export enum SchemeName {
    Bban = "BBAN",
}

export interface TorAgent {
    bic_fi:                    BicFi;
    clearing_system_member_id: null;
    name:                      null;
}

export enum BicFi {
    Essesessxxx = "ESSESESSXXX",
}

export enum Status {
    Book = "BOOK",
}
