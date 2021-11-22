const users = [
  { name: 'Ines', favorite_color: 'Yellow' },
  { name: 'Lukas', favorite_color: 'Blue' },
  { name: 'Andrea', favorite_color: 'Purple' },
  { name: 'Ingo', favorite_color: 'Black' },
  { name: 'Felix', favorite_color: 'Anthracite' },
];

exports.up = async function up(sql) {
  console.log('Deleting users...');
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        name = ${user.name} AND favorite_color = ${user.favorite_color};
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Inserting users...');
  for (const user of users) {
    await sql`
      INSERT INTO users
        (name, favorite_color)
      VALUES
        (${user.name}, ${user.favorite_color});
    `;
  }
};

