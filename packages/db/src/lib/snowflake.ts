import { env } from "@metapress/env/server";
import { Snowflake } from "@sapphire/snowflake";

const workerId = BigInt(env.SNOWFLAKE_WORKER_ID);
const epoch = new Date(env.SNOWFLAKE_EPOCH);
const snowflake = new Snowflake(epoch);

export const generateSnowflake = () => {
  return snowflake.generate({ workerId }).toString();
};

export const decodeSnowflake = (id: string) => {
  const data = snowflake.deconstruct(BigInt(id));
  return {
    createdAt: new Date(Number(data.timestamp)),
    workerId: data.workerId,
    sequence: data.increment,
  };
};
