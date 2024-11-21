export interface HttpGetSession {
    status:        string;
    accounts:      string[];
    accounts_data: AccountsDatum[];
    aspsp:         Aspsp;
    psu_type:      string;
    psu_id_hash:   string;
    access:        Access;
    created:       Date;
    authorized:    Date;
    closed:        null;
}

export interface CreateSessionResponse {
    session_id: string;
    accounts:   Account[];
    aspsp:      Aspsp;
    psu_type:   string;
    access:     Access;
}

export interface Access {
    accounts:     null;
    balances:     boolean;
    transactions: boolean;
    valid_until:  Date;
}

export interface AccountsDatum {
    uid:                   string;
    identification_hash:   string;
    identification_hashes: string[];
}

export interface Aspsp {
    name:    string;
    country: string;
}

export interface Account {
    account_id:            AccountID;
    all_account_ids:       Other[];
    account_servicer:      AccountServicer;
    name:                  string;
    details:               null | string;
    usage:                 null;
    cash_account_type:     string;
    product:               null | string;
    currency:              string;
    psu_status:            null;
    credit_limit:          null;
    legal_age:             null;
    uid:                   null | string;
    identification_hash:   string;
    identification_hashes: string[];
}

export interface AccountID {
    iban:  string;
    other: Other;
}

export interface Other {
    identification: string;
    scheme_name:    SchemeName;
    issuer:         null;
}

export enum SchemeName {
    Bban = "BBAN",
    Iban = "IBAN",
}

export interface AccountServicer {
    bic_fi:                    null;
    clearing_system_member_id: ClearingSystemMemberID;
    name:                      null;
}

export interface ClearingSystemMemberID {
    clearing_system_id: string;
    member_id:          string;
}

