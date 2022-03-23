import { Migration } from "https://deno.land/x/nessie@2.0.5/mod.ts";
import { Schema } from "https://deno.land/x/nessie@2.0.5/qb.ts";

/** Runs on migrate */
export const up: Migration = () => {
  return `
    ALTER TABLE users
    ADD UNIQUE email_unique (email)
  `;
};

/** Runs on rollback */
export const down: Migration = () => {
  return `
    ALTER TABLE users
    DROP INDEX email_unique
  `;
};
