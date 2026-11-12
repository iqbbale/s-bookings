import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

export const contract = contractFromJson<Contract>(contractJson);

const createDbClient = () => {
  return postgres({
    contract,
    url: process.env["DATABASE_URL"]!,
  });
};

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDbClient> | undefined;
};

export const db = globalForDb.db ?? createDbClient();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
