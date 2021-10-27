exports.up = async function up(sql) {
  await sql`
    ALTER TABLE
      users
    ADD COLUMN
      username varchar(40) UNIQUE,
    ADD COLUMN
      password_hash varchar(60)
  `;
};

exports.down = async function down(sql) {
  await sql`
    ALTER TABLE
      users
    DROP COLUMN
      username,
    DROP COLUMN
      password_hash
  `;
};
