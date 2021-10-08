// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser, getUsers } from '../../../util/database';

export default async function handler(req, res) {
  // console.log('query', req.query);
  // console.log('body', req.body);
  // console.log('method', req.method);

  if (req.method === 'GET') {
    const users = await getUsers();
    return res.status(200).json(users);
  } else if (req.method === 'POST') {
    const body = req.body;

    // the code for the POST request
    const createdUser = await createUser({
      name: body.userName,
      favoriteColor: body.userColor,
    });

    return res.status(200).json(createdUser);
  }

  return res.status(405);
}

// localhost:3000/api/users
