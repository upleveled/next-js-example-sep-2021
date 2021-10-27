import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import {
  getUserWithPasswordHashByUsername,
  insertUser,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type RegisterRequest = {
  username: string;
  password: string;
};

export type RegisterResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain username and password' }],
    });
    return;
  }

  try {
    const username = req.body.username;

    const existingUser = await getUserWithPasswordHashByUsername(username);

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Username already exists' }],
      });
      return;
    }

    const passwordHash = await hashPassword(req.body.password);

    const user = await insertUser({
      username: username,
      passwordHash: passwordHash,
    });

    res.send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
