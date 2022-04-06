import { AbstractMigration, ClientMySQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientMySQL> {
    /** Runs on migrate */
    async up(): Promise<void> {
        console.log("CREATE USERS");
        // sql query to create a table user if no t exists
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                roles varchar(256) NOT NULL DEFAULT 'user',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE email_unique (email)
            )
            `
        await this.client
            .query(query)
        await this.client.query(
            `
            INSERT into users VALUES
            (DEFAULT, 'Asad Rahman', 'asad.dk.bd@gmail.com', 1, DEFAULT,DEFAULT, DEFAULT, DEFAULT),
            (DEFAULT, 'Ida Watson', 'ida.watson@example.com', 1, DEFAULT,DEFAULT, DEFAULT, DEFAULT),
            (DEFAULT, "Marshall Barrett", "marshall.barrett@example.com", 1, DEFAULT,DEFAULT, DEFAULT, DEFAULT),
            (DEFAULT, 'John Doe', 'john@example.com', 1, DEFAULT,DEFAULT, DEFAULT, DEFAULT);
            `,
        )
    }

    /** Runs on rollback */
    async down(): Promise<void> {
        console.log("DROP USERS");
        await this.client.query(
            `
            DROP TABLE users;
            `,
        )
    }
}
