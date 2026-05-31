import { env } from "@metapress/env/server";
import Hashids from "hashids";

const hashIdSalt = env.HASHIDS_SALT;
const hashIds = new Hashids(hashIdSalt, 8);

export const encodeId = (id: string) => {
  return hashIds.encode(BigInt(id));
};

export const decodeId = (hash: string) => {
  const isValid = hashIds.isValidId(hash);
  if (!isValid) {
    return null;
  }

  const result = hashIds.decode(hash);
  if (!result.length) {
    return null;
  }

  return result[0].toString();
};
