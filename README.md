# Next.js Example - Sep 2021

- Next.js
- Postgres.js
- Jest
- Cypress.io
- GitHub Actions

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```sh
psql -U postgres
```

**macOS**

```sh
psql postgres
```

**Linux**

```sh
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Then, to connect to the database using this new user, quit `psql` and reconnect:

```sh
\q
psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```sh
yarn migrate up
```

To reverse the last single migration, run:

```sh
yarn migrate down
```

## API Design

Base URL (development): http://localhost:3000/api/

1. Reading all users: `GET /users`
2. Reading a single user: `GET /users/:id`
3. Creating a new user: `POST /users`
4. Deleting a user: `DELETE /users/:id`
5. Updating a user: `PUT /users/:id`
