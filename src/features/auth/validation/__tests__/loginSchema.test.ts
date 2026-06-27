import { loginSchema } from '../loginSchema';

describe('loginSchema', () => {
  it('accepts a valid email and password', async () => {
    await expect(
      loginSchema.validate({
        email: 'user@example.com',
        password: 'password1',
      }),
    ).resolves.toBeTruthy();
  });

  it('rejects an invalid email', async () => {
    await expect(
      loginSchema.validate({ email: 'not-an-email', password: 'password1' }),
    ).rejects.toThrow(/valid email/i);
  });

  it('rejects a short password', async () => {
    await expect(
      loginSchema.validate({ email: 'user@example.com', password: '123' }),
    ).rejects.toThrow(/at least 8/i);
  });
});
