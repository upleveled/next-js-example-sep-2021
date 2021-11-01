export default function UpdateDontCopy(props) {
  if (!props.updatedUser) return <main>User not found</main>;

  return (
    <main>
      User with id {props.updatedUser.id} updated:
      <pre>{JSON.stringify(props.updatedUser, null, 2)}</pre>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { updateUser2ById } = await import('../../../util/database');

  const userIdToUpdate = context.query.userId;
  const userNewName = context.query.name;
  const userNewFavoriteColor = context.query.favoriteColor;

  const updatedUser = await updateUser2ById(userIdToUpdate, {
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
