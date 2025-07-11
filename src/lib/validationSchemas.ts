import { z } from 'zod';

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(1, 'validation.nameRequired')
    .min(2, 'validation.nameMinLength')
    .max(50, 'validation.nameMaxLength'),
  email: z
    .string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'validation.passwordRequired')
    .min(6, 'validation.passwordMinLength')
    .max(50, 'validation.passwordMaxLength'),
  confirmPassword: z
    .string()
    .min(1, 'validation.confirmPasswordRequired')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordsNotMatch',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'validation.currentPasswordRequired'),
  newPassword: z
    .string()
    .min(1, 'validation.newPasswordRequired')
    .min(6, 'validation.passwordMinLength')
    .max(50, 'validation.passwordMaxLength'),
  confirmNewPassword: z
    .string()
    .min(1, 'validation.confirmNewPasswordRequired')
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'validation.passwordsNotMatch',
  path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'validation.newPasswordMustBeDifferent',
  path: ['newPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
