import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup.string().email('Ingresa un email válido'),
  password: yup
    .string()
    .required('Ingresa tu contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe tener al menos una letra'),
});
