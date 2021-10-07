import {
  addOrRemoveFromFollowingArray,
  findUserAndIncrementClapCount,
} from '../cookies';

const userId = 1;
const followingArray1 = [{ id: userId, clapCount: 0 }];

test('increments user clap count correctly', () => {
  expect(findUserAndIncrementClapCount(followingArray1, userId)).toStrictEqual({
    id: userId,
    clapCount: 1,
  });
});

const followingArray2 = [{ id: 1, clapCount: 0 }];
const userIdToAdd = 2;
const userIdToRemove = 1;

test('adds user to following array', () => {
  expect(
    addOrRemoveFromFollowingArray(followingArray2, userIdToAdd, () => {}),
  ).toStrictEqual([
    { id: 1, clapCount: 0 },
    { id: 2, clapCount: 0 },
  ]);
});

test('removes user from following array', () => {
  expect(
    addOrRemoveFromFollowingArray(followingArray2, userIdToRemove, () => {}),
  ).toStrictEqual([]);
});
