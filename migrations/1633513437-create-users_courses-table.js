exports.up = async function up(sql) {
  console.log('Creating users_courses join / junction table...');
  await sql`
    CREATE TABLE users_courses (
      user_id integer REFERENCES users(id) ON DELETE CASCADE,
      course_id integer REFERENCES courses(id) ON DELETE CASCADE,
			PRIMARY KEY (user_id, course_id)
    );
  `;
};

exports.down = async function down(sql) {
  console.log('Dropping users_courses join / junction table...');
  await sql`DROP TABLE users_courses;`;
};
