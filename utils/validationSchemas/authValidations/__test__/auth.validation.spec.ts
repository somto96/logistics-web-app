import { loginSchema } from '../loginValidations';
import * as Yup from 'yup';

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe('Login Validation', () => {
  it('should validate a valid object', async () => {
    const validObject = {
      email: 'john.doe@gmail.com',
      password: 'john123',
    };

    expect.assertions(1);
    await expect(loginSchema.validate(validObject)).resolves.toBe(validObject);
  });

  it('should throw an error for an empty password field', async () => {
    const invalidObject = {
      email: 'motivatedsomto@gmail.com',
      password: '',
    };
    const error: Yup.ValidationError = await getError(async () =>
      loginSchema.validate(invalidObject)
    );

    expect(error.errors).toContain('Please enter your password');
  });
  it('should throw an error for an invalid email address', async () => {
    const invalidObject = {
      email: 'motivatedsomtogmail.com',
      password: 'somto123',
    };
    const error: Yup.ValidationError = await getError(async () =>
      loginSchema.validate(invalidObject)
    );

    expect(error.errors).toContain('Invalid email address');
  });
});
