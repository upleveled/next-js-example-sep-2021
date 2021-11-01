export default function CreateDontCopy(props) {
  if (!props.createdUser) {
    return (
      <main>
        User not created
        <span role="img" aria-label="screaming face">
          😱
        </span>
      </main>
    );
  }

  return (
    <main>
      Created user with id{' '}
      <span data-cy="create-page-created-user-id">{props.createdUser.id}</span>:
      <pre>{JSON.stringify(props.createdUser, null, 2)}</pre>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { createUser } = await import('../../../util/database');

  // Early error checking
  if (!context.query.name || !context.query.favoriteColor) {
    // Early return
    return { props: {} };
  }

  const createdUser = await createUser({
    username: context.query.name,
    password: context.query.favoriteColor,
  });

  return {
    props: {
      // createdUser: createdUser ? createdUser : null,
      createdUser: createdUser || null,
    },
  };
}
