import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Ingresa tu email')
    .email('Ingresa un email válido'),
});
