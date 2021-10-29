import { serialize } from 'cookie';
import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function findUserAndIncrementClapCount(users, userId) {
  const userFromCookie = users.find((cookieObj) => cookieObj.id === userId);
  userFromCookie.clapCount += 1;
  return userFromCookie;
}

export function addOrRemoveFromFollowingArray(
  followingArray,
  userId,
  removedCallback,
) {
  const isUserFollowed = followingArray.some(
    (cookieObject /* number => object */) => {
      return cookieObject.id === userId; // id that comes from the URL
    },
  );

  let newCookie;
  if (isUserFollowed) {
    // remove the user
    newCookie = followingArray.filter(
      (cookieObject /* number => object */) => cookieObject.id !== userId,
    );

    removedCallback();
  } else {
    // add the userdev
    newCookie = [...followingArray, { id: userId, clapCount: 0 }];
  }

  return newCookie;
}

export function createSerializedRegisterSessionTokenCookie(token) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 5; // 5 minutes

  return serialize('sessionToken', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    httpOnly: true,
    // Important for security
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
