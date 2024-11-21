export interface Details {
    account_id:            AccountID;
    all_account_ids:       null;
    account_servicer:      AccountServicer;
    name:                  string;
    details:               string;
    usage:                 null;
    cash_account_type:     string;
    product:               string;
    currency:              string;
    psu_status:            null;
    credit_limit:          null;
    uid:                   string;
    identification_hash:   string;
    identification_hashes: string[];
}

export interface AccountID {
    iban:  string;
    other: Other;
}

export interface Other {
    identification: string;
    scheme_name:    string;
    issuer:         null;
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
