// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  deleteUserById,
  getUser,
  updateUserById,
} from '../../../util/database';

export default async function handler(req, res) {
  console.log('query', req.query);
  // console.log('body', req.body);
  // console.log('method', req.method);

  if (req.method === 'GET') {
    const user = await getUser(Number(req.query.userId));
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    console.log('query', req.query);
    // the code for the POST request
    const deletedUser = await deleteUserById(Number(req.query.userId));

    return res.status(200).json(deletedUser);
  } else if (req.method === 'PATCH') {
    const body = req.body;
    const query = req.query;

    const updatedUser = await updateUserById(Number(query.userId), {
      name: body.userName,
      favoriteColor: body.userColor,
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405);
}

// localhost:3000/api/users/:id
