export default function ReadDontCopy(props) {
  if (!props.user) return <main>User not found</main>;

  return (
    <main>
      Read user with id {props.user.id}:
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { getUsers2 } = await import('../../../util/database');

  const user = await getUsers2(context.query.userId);

  return {
    props: {
      user,
    },
  };
}
