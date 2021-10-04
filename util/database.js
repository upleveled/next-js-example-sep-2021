import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read in the environment variables
// in the .env file, making it possible
// to connect to PostgreSQL
dotenvSafe.config();

// Connect to PostgreSQL
const sql = postgres();

sql`SELECT 1;`.then((result) => console.log(result));

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;
  return users.map((user) => {
    return camelcaseKeys(user);
  });
}

export async function getUser(id) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseKeys(users[0]);
}

// We don't need this anymore because
// we're getting data from the database!
// export const users = [
//   { id: '4', name: 'Ines', favoriteColor: 'yellow' },
//   { id: '5', name: 'Lucas', favoriteColor: 'blue' },
//   { id: '6', name: 'Andrea', favoriteColor: 'purple' },
//   { id: '7', name: 'Ingo', favoriteColor: 'black' },
// ];
