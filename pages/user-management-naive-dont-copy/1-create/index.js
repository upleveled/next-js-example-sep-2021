export default function CreateDontCopy(props) {
  if (!props.createdUser) {
    return (
      <div>
        User not created
        <span role="img" aria-label="screaming face">
          😱
        </span>
      </div>
    );
  }

  return (
    <div>
      Created user with id {props.createdUser.id}:
      <pre>{JSON.stringify(props.createdUser, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { createUser } = await import('../../../util/database');

  const createdUser = await createUser({
    name: context.query.name,
    favoriteColor: context.query.favoriteColor,
  });

  return {
    props: {
      // createdUser: createdUser ? createdUser : null,
      createdUser: createdUser || null,
    },
  };
}
