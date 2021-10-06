export default function DeleteDontCopy(props) {
  if (!props.deletedUser) return <div>User not found</div>;

  return <div>User with id {props.deletedUser.id} deleted</div>;
}

export async function getServerSideProps(context) {
  const { deleteUserById } = await import('../../../util/database');
  const userIdToDelete = context.query.userId;
  const deletedUser = await deleteUserById(userIdToDelete);
  return {
    props: {
      // deletedUser: deletedUser ? deletedUser : null,
      deletedUser: deletedUser || null,
    },
  };
}
