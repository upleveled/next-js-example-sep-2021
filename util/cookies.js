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
