import { Migration } from "https://deno.land/x/nessie@2.0.5/mod.ts";

/** Runs on migrate */
export const up: Migration = () => {
  return `
    ALTER TABLE users
    ADD roles varchar(256) AFTER email;
  `;
};

/** Runs on rollback */
export const down: Migration = () => {
  return `
    ALTER TABLE users DROP roles;
  `;
};
