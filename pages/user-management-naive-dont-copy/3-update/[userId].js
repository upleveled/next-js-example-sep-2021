export default function UpdateDontCopy(props) {
  if (!props.updatedUser) return <div>User not found</div>;

  return (
    <div>
      User with id {props.updatedUser.id} updated:
      <pre>{JSON.stringify(props.updatedUser, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { updateUserById } = await import('../../../util/database');

  const userIdToUpdate = context.query.userId;
  const userNewName = context.query.name;
  const userNewFavoriteColor = context.query.favoriteColor;

  const updatedUser = await updateUserById(userIdToUpdate, {
    name: userNewName,
    favoriteColor: userNewFavoriteColor,
  });

  return {
    props: {
      // updatedUser: updatedUser ? updatedUser : null,
      updatedUser: updatedUser || null,
    },
  };
}
