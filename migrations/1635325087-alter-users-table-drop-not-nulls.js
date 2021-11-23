exports.up = async function up(sql) {
  await sql`
    ALTER TABLE
      users
    ALTER COLUMN
      name DROP NOT NULL,
    ALTER COLUMN
      favorite_color DROP NOT NULL
  `;
};

exports.down = async function down(sql) {
  await sql`
    ALTER TABLE
      users
    ALTER COLUMN
      name SET NOT NULL,
    ALTER COLUMN
      favorite_color SET NOT NULL
  `;
};
