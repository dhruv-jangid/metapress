import { getLogger as getDrizzleLogger } from "@logtape/drizzle-orm";
import { elysiaLogger } from "@logtape/elysia";
import { configure, getAnsiColorFormatter, getConsoleSink, getLogger } from "@logtape/logtape";
import { env } from "@metapress/env/server";

export const setupLogger = async () => {
  await configure({
    sinks: {
      console: getConsoleSink({
        formatter: getAnsiColorFormatter({
          timestamp: (ts) =>
            new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "+05:30",
              hour12: true,
            }).format(new Date(ts)),
          timestampColor: "black",
        }),
      }),
    },
    loggers: [
      {
        category: "app",
        lowestLevel: env.NODE_ENV === "development" ? "trace" : "info",
        sinks: ["console"],
      },
      {
        category: ["logtape", "meta"],
        lowestLevel: "warning",
        sinks: ["console"],
      },
    ],
  });
};

export const useLogger = (...modules: string[]) => getLogger(["app", ...modules]);

export const useDrizzleLogger = () => getDrizzleLogger({ category: ["app", "db"] });

export const useElysiaLogger = () => elysiaLogger({ category: ["app", "server"], format: "dev" });
