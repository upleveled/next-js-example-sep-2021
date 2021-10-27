import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword } from '../../util/auth';
import { getUserWithPasswordHashByUsername, User } from '../../util/database';
import { Errors } from '../../util/types';

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain username and password' }],
    });
    return;
  }

  try {
    const username = req.body.username;

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      username,
    );

    // Username doesn't match anything in the database
    if (!userWithPasswordHash) {
      res.status(401).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }

    const isPasswordVerified = await verifyPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    // Password doesn't match hash in the database
    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }

    // Important! Removing the password
    // hash from the response sent back
    // to the user
    const { passwordHash, ...user } = userWithPasswordHash;

    res.send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
