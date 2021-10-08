import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Users(props) {
  const [userList, setUserList] = useState(props.users);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const [updateName, setUpdateName] = useState('');
  const [updateColor, setUpdateColor] = useState('');

  async function createUser(userName, userColor) {
    const usersResponse = await fetch(`${props.baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, userColor }),
    });

    const user = await usersResponse.json();
    const newSate = [...userList, user];
    setUserList(newSate);
  }

  async function deleteUser(id) {
    const usersResponse = await fetch(`${props.baseUrl}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deletedUser = await usersResponse.json();
    const newSate = userList.filter((user) => user.id !== deletedUser.id);
    setUserList(newSate);
  }

  async function updateUser(id, newName, NewColor) {
    const usersResponse = await fetch(`${props.baseUrl}/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: newName, userColor: NewColor }),
    });

    const updatedUser = await usersResponse.json();

    const newSate = [...userList];

    const outdatedUser = newSate.find((user) => user.id === updatedUser.id);

    outdatedUser.name = updatedUser.name;
    outdatedUser.favoriteColor = updatedUser.favoriteColor;

    setUserList(newSate);
  }

  return (
    <Layout>
      <Head>
        <title>users</title>
      </Head>
      <h2>Users List</h2>
      <h3>create user</h3>
      <label>
        name:
        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </label>
      <label>
        color:
        <input
          value={color}
          onChange={(e) => setColor(e.currentTarget.value)}
        />
        <button onClick={() => createUser(name, color)}>create</button>
      </label>
      <br />
      <label>
        update Name:
        <input
          value={updateName}
          onChange={(e) => setUpdateName(e.currentTarget.value)}
        />
      </label>
      <label>
        update Color:
        <input
          value={updateColor}
          onChange={(e) => setUpdateColor(e.currentTarget.value)}
        />
      </label>
      <ul>
        {userList.map((user) => {
          return (
            <li key={`user-li-${user.id}`}>
              {user.name} color: {user.favoriteColor}
              <button onClick={() => deleteUser(user.id)}>delete</button>
              <button
                onClick={() => updateUser(user.id, updateName, updateColor)}
              >
                update
              </button>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL;
  const usersResponse = await fetch(`${baseUrl}/api/users`);
  const users = await usersResponse.json();

  console.log('from gSSP', users);

  return {
    props: {
      users,
      baseUrl,
    },
  };
}
