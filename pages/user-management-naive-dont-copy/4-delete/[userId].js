export default function DeleteDontCopy(props) {
  if (!props.deletedUser) return <main>User not found</main>;

  return <main>User with id {props.deletedUser.id} deleted</main>;
}

export async function getServerSideProps(context) {
  const { deleteUser2ById } = await import('../../../util/database');
  const userIdToDelete = context.query.userId;
  const deletedUser = await deleteUser2ById(userIdToDelete);
  return {
    props: {
      // deletedUser: deletedUser ? deletedUser : null,
      deletedUser: deletedUser || null,
    },
  };
}
