export default function ReadDontCopy(props) {
  if (!props.user) return <div>User not found</div>;

  return (
    <div>
      Read user with id {props.user.id}:
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getUser } = await import('../../../util/database');

  const user = await getUser(context.query.userId);

  return {
    props: {
      user,
    },
  };
}
