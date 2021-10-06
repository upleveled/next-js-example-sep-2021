exports.up = async function up(sql) {
  console.log('Altering the users table to rename the column...');
  await sql`
    ALTER TABLE users
    RENAME COLUMN namex TO name;
  `;
};

exports.down = async function down(sql) {
  console.log('Altering the users table to rename the column...');
  await sql`
    ALTER TABLE users
    RENAME COLUMN name TO namex;
  `;
};
