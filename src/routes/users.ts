import {
  IUser,
  IUserEditableFields,
  User,
  UserEditableFields,
} from '../models/User';
import express from 'express';
import { ZodError } from 'zod';

const router = express.Router();

const users: IUser[] = [];

function findByLogin(login: string) {
  return users.find((user) => user.login === login);
}

function findById(id: IUser['id']) {
  return users.find((user) => user.id === id);
}

function sortByLogin(a: IUser, b: IUser) {
  return a.login.localeCompare(b.login);
}

router
  .get<{}, {}, {}, { loginSubstring: string; limit: number }>(
    '/getAutoSuggestUsers',
    function (req, res) {
      const { loginSubstring = '', limit = users.length } = req.query;

      let filteredUsers: IUser[] = [];

      filteredUsers = users.filter((user) =>
        user.login.includes(loginSubstring),
      );
      filteredUsers = filteredUsers.slice(0, limit);

      res.send(filteredUsers.sort(sortByLogin));
    },
  )
  .post<{}, {}, IUserEditableFields>('/', function (req, res) {
    const newUserData = req.body;

    const existingUser = findByLogin(newUserData.login);
    if (existingUser) return res.status(400).send('User already exists');

    try {
      const newUser = User.parse(newUserData);
      users.push(newUser);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json(error as ZodError);
    }
  });

router
  .get<{ id: IUser['id'] }>('/:id', function (req, res) {
    const { id } = req.params;

    const existingUser = findById(id);
    if (!existingUser) return res.status(400).send('User does not exist');

    res.send(existingUser);
  })
  .patch<{ id: IUser['id'] }, {}, IUserEditableFields>(
    '/:id',
    function (req, res) {
      const { id } = req.params;
      const data = req.body;

      let existingUser = findById(id);
      if (!existingUser) return res.status(400).send('User does not exist');

      try {
        const validatedData = UserEditableFields.partial().parse(data);

        const indexOfUser = users.indexOf(existingUser);
        users[indexOfUser] = { ...existingUser, ...validatedData };

        res.sendStatus(200);
      } catch (error) {
        res.status(400).json(error as ZodError);
      }
    },
  )
  .delete<{ id: IUser['id'] }>('/:id', function (req, res) {
    const { id } = req.params;

    let existingUser = findById(id);
    if (!existingUser) return res.status(400).send('User does not exist');

    const indexOfUser = users.indexOf(existingUser);
    users[indexOfUser].isDeleted = true;

    res.sendStatus(200);
  });

export default router;
