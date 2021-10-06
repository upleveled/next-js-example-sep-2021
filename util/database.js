import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read in the environment variables
// in the .env file, making it possible
// to connect to PostgreSQL
dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;
  return users.map((user) => {
    // Convert the snake case favorite_color to favoriteColor
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
      id = ${id};
  `;
  // We return users[0] because we only want the first user
  return camelcaseKeys(users[0]);
}

export async function createUser({ name, favoriteColor }) {
  const users = await sql`
    INSERT INTO users
      (name, favorite_color)
    VALUES
      (${name}, ${favoriteColor})
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return camelcaseKeys(users[0]);
}

export async function updateUserById(id, { name, favoriteColor }) {
  const users = await sql`
    UPDATE
      users
    SET
      name = ${name},
      favorite_color = ${favoriteColor}
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return camelcaseKeys(users[0]);
}

export async function deleteUserById(id) {
  const users = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return camelcaseKeys(users[0]);
}

// Join query to get information from multiple tables
export async function getCoursesByUserId(userId) {
  const courses = await sql`
    SELECT
      courses.id,
      courses.title,
      courses.description
    FROM
      users,
      users_courses,
      courses
    WHERE
      users.id = ${userId} AND
      users_courses.user_id = users.id AND
      courses.id = users_courses.course_id;
  `;
  return courses.map((course) => camelcaseKeys(course));
}

// We don't need this anymore because
// we're getting data from the database!
// export const users = [
//   { id: '4', name: 'Ines', favoriteColor: 'yellow' },
//   { id: '5', name: 'Lucas', favoriteColor: 'blue' },
//   { id: '6', name: 'Andrea', favoriteColor: 'purple' },
//   { id: '7', name: 'Ingo', favoriteColor: 'black' },
// ];
