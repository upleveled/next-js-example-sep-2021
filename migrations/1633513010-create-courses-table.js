exports.up = async function up(sql) {
  console.log('Creating courses table...');
  await sql`
    CREATE TABLE courses (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      title VARCHAR(40) NOT NULL,
      description VARCHAR(80) NOT NULL
    );
  `;
};

exports.down = async function down(sql) {
  console.log('Dropping courses table...');
  await sql`DROP TABLE courses;`;
};
