const users = [
  { name: 'Ines', favorite_color: 'Yellow' },
  { name: 'Lukas', favorite_color: 'Blue' },
  { name: 'Andrea', favorite_color: 'Purple' },
  { name: 'Ingo', favorite_color: 'Black' },
  { name: 'Felix', favorite_color: 'Anthracite' },
];

exports.up = async function up(sql) {
  console.log('Inserting users...');
  // await sql`
  //   INSERT INTO users
  //     (name, favorite_color)
  //   VALUES
  //     ('Ines', 'Yellow'),
  //     ('Lucas', 'Blue'),
  //     ('Andrea', 'Purple'),
  //     ('Ingo', 'Black');
  // `;

  // Looping over the array and INSERTing each user
  for (const user of users) {
    await sql`
      INSERT INTO users
        (name, favorite_color)
      VALUES
        (${user.name}, ${user.favorite_color});
    `;
  }

  // Alternative shortcut from Postgres.js
  // https://github.com/porsager/postgres#multiple-inserts-in-one-query
  // await sql`
  //   INSERT INTO users ${sql(users, 'name', 'favorite_color')};
  // `;
};

exports.down = async function down(sql) {
  console.log('Deleting users...');

  // await sql`
  //   DELETE FROM
  //     users
  //   WHERE
  //     (name = 'Ines' AND favorite_color = 'Yellow') OR
  //     (name = 'Lucas' AND favorite_color = 'Blue') OR
  //     (name = 'Andrea' AND favorite_color = 'Purple') OR
  //     (name = 'Ingo' AND favorite_color = 'Black');`;

  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        name = ${user.name} AND favorite_color = ${user.favorite_color};
    `;
  }
};
