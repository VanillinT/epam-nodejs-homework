import { z } from 'zod';
import { v4 as uuid } from 'uuid';

export const UserGeneratedFields = z
  .object({
    id: z.string().uuid().default(uuid),
    isDeleted: z.boolean().default(false),
  })
  .optional();
export type IUserGeneratedFields = z.infer<typeof UserGeneratedFields>;

export const UserEditableFields = z.object({
  login: z
    .string({
      required_error: 'Login is required',
    })
    .trim()
    .min(4)
    .max(16),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(4)
    .refine(
      (value) => {
        const [containsNumbers, containsLetters] = [
          '.*[0-9].*',
          '.*[A-Za-z].*',
        ].map((pattern) => RegExp(pattern).test(value));

        return containsNumbers && containsLetters;
      },
      {
        message: 'Password should contain both letters and numbers',
      },
    ),
  age: z.coerce
    .number({
      required_error: 'Age is required',
    })
    .int()
    .min(4)
    .max(130),
});
export type IUserEditableFields = z.infer<typeof UserEditableFields>;

export const User = z.intersection(UserGeneratedFields, UserEditableFields);
export type IUser = z.infer<typeof User>;
