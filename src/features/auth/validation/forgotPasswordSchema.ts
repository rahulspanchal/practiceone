import * as yup from 'yup';

/** Validation schema for the forgot-password (request new password) form. */
export const forgotPasswordSchema = yup.object({
  userId: yup.string().required('User ID is required'),
});

export type ForgotPasswordFormValues = yup.InferType<
  typeof forgotPasswordSchema
>;
