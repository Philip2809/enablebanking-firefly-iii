import type { PsuType } from "./enums.ts";

export interface StartAuthorizationResponse {
    url:              string;
    authorization_id: string;
    psu_id_hash:      string;
}


export interface StartAuthorizationRequest {
    access: Access;
    aspsp: ASPSP;
    state: string;
    redirect_url: string;
    psu_type?: PsuType;
    auth_method?: string;
    credentials?: object;
    credentials_autosubmit?: boolean;
    language?: string;
    psu_id?: string;
}

interface ASPSP {
    country: string;
    name: string;
}

interface Access {
    accounts?: AccountIdentification;
    balances?: boolean;
    transactions?: boolean;
    valid_until: string; // RFC3339 
}

interface AccountIdentification {
    iban?: string;
    other?: string // type later
}