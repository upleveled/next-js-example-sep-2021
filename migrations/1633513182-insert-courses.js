const courses = [
  {
    title: 'Web Development Bootcamp',
    description: 'Full stack web development bootcamp',
  },
  {
    title: 'Tech Fundamentals Course',
    description: 'Broad technical overview course',
  },
];

exports.up = async function up(sql) {
  console.log('Inserting courses...');
  // Looping over the array and INSERTing each course
  for (const course of courses) {
    await sql`
      INSERT INTO courses
        (title, description)
      VALUES
        (${course.title}, ${course.description});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting courses...');
  for (const course of courses) {
    await sql`
      DELETE FROM
        courses
      WHERE
        title = ${course.title} AND description = ${course.description};
    `;
  }
};
