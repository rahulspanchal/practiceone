import * as yup from 'yup';

/** Validation schema for the login form. Single source of truth for the rules. */
export const loginSchema = yup.object({
  email: yup.string().required('User ID is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
