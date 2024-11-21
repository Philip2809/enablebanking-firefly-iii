

import jwa from 'jwa';
import { Buffer } from "node:buffer";
import { config } from "./utils.ts";

function signWithKey(data: string): string {
  const decoder = new TextDecoder("utf-8");
  const key = decoder.decode(Deno.readFileSync(`./keys/${config.applicationKeyFile}`));
  const hmac = jwa("RS256");
  return hmac.sign(data, key);
}

function encodeData(data: Object): string {
  return Buffer.from(JSON.stringify(data)).toString("base64").replace("=", "")
}

const getJWTBody = (exp: number): string => {
  const timestamp = Math.floor((new Date()).getTime() / 1000)
  return encodeData({
    iss: "enablebanking.com",
    aud: "api.enablebanking.com",
    iat: timestamp,
    exp: timestamp + exp,
  })
}

function getJWTHeader(): string {
  return encodeData({
    typ: "JWT",
    alg: "RS256",
    kid: config.applicationId
  })
}

export function getJWT(exp = 3600) {
  const jwtHeaders = getJWTHeader()
  const jwtBody = getJWTBody(exp);
  const jwtSignature = signWithKey(`${jwtHeaders}.${jwtBody}`)
  return `${jwtHeaders}.${jwtBody}.${jwtSignature}`
}