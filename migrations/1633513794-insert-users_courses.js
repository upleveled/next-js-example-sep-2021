const usersCourses = [
  {
    user_id: 1, // Ines
    course_id: 1, // Web Development Bootcamp
  },
  {
    user_id: 3, // Andrea
    course_id: 1, // Web Development Bootcamp
  },
  {
    user_id: 3, // Andrea
    course_id: 2, // Tech Fundamentals Course
  },
];

exports.up = async function up(sql) {
  console.log('Inserting user_courses...');
  // Looping over the array and INSERTing each user_course
  for (const usersCourse of usersCourses) {
    await sql`
      INSERT INTO users_courses
        (user_id, course_id)
      VALUES
        (${usersCourse.user_id}, ${usersCourse.course_id});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting user_courses...');
  for (const usersCourse of usersCourses) {
    await sql`
      DELETE FROM
        users_courses
      WHERE
        user_id = ${usersCourse.user_id} AND course_id = ${usersCourse.course_id};
    `;
  }
};
