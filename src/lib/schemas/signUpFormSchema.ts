import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Ingresa tu email')
    .email('Ingresa un email válido'),
  password: yup
    .string()
    .required('Ingresa tu contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe tener al menos una letra'),
  passwordConfirmation: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
});
