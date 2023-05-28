import { createAccountSchema } from '../createAccountValidations';
import { enterEmailSchema } from '../forgotPasswordValidations';
import { setPasswordSchema } from '../setPasswordValidations';
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

describe('createAccountSchema', () => {
  const validObject = {
    contactFullName: 'John Doe',
    companyName: 'Test Plc',
    phoneNumber: '08012345678',
    email: 'john.doe@gmail.com',
    city: 'Ajah',
    state: 'Lagos',
    address: 'Ajah, Lagos',
  };

  it('should validate a valid object', async () => {
    expect.assertions(1);
    await expect(createAccountSchema.validate(validObject)).resolves.toBe(validObject);
  });
  it('should throw an error for an invalid email', async () => {
    const invalidObject = {
      ...validObject,
      email: 'john.doegmail.com',
    };
    const error: Yup.ValidationError = await getError(async () =>
      createAccountSchema.validate(invalidObject)
    );

    expect(error.errors).toContain('Invalid email address');
  });
  it('should throw an error for a sample invalid object', async () => {
    const invalidObject = {
      ...validObject,
      address: '',
    };
    const error: Yup.ValidationError = await getError(async () =>
      createAccountSchema.validate(invalidObject)
    );
    expect(error.errors).toContain('Please enter your address');
  });
});

describe('enterEmailSchema', () => {
  const validObject = {
    email: 'john.doe@gmail.com',
  };
  it('should validate a valid object', async () => {
    expect.assertions(1);
    await expect(enterEmailSchema.validate(validObject)).resolves.toBe(validObject);
  });

  it('should throw an error for an invalid email', async () => {
    const invalidObject = {
      ...validObject,
      email: '',
    };
    const error: Yup.ValidationError = await getError(async () =>
      enterEmailSchema.validate(invalidObject)
    );
    expect(error.errors).toContain('Enter a valid email address');
  });
  it('should throw an error for an invalid object', async () => {
    const invalidObject = {
      ...validObject,
      email: 'john.doegmail.com',
    };
    const error: Yup.ValidationError = await getError(async () =>
      enterEmailSchema.validate(invalidObject)
    );
    expect(error.errors).toContain('Invalid email address');
  });
});

describe('setPasswordSchema', () => {
  const validObject = {
    password: 'john123',
    confirmPassword: 'john123',
  };
  it('should validate a valid object', async () => {
    expect.assertions(1);
    await expect(setPasswordSchema.validate(validObject)).resolves.toBe(validObject);
  });

  it("should throw an error if password and confirmPassword aren't equal", async () => {
    const invalidObject = {
      password: 'john123',
      confirmPassword: 'john245',
    };
    const error: Yup.ValidationError = await getError(async () =>
      setPasswordSchema.validate(invalidObject)
    );
    expect(error.errors).toContain('Password does not match');
  });
});
