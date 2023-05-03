// import logo from '@assets/logo.svg';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCsrfToken } from 'next-auth/react';

import strapiClient from '@/lib/clients/strapiClient';
import { BUSINESS_NAME } from '@/lib/constants';
import useFormSchema from '@/lib/hooks/useFormSchema';
import useToast from '@/lib/hooks/useToast';
import { forgotPasswordSchema } from '@/lib/schemas/forgotPasswordSchema';

import { NoLayout } from '@/components/layout/NoLayout';

import Logo from '~/svg/logo.svg';

type Inputs = {
  email: string;
};

interface IForgotPassword {
  csrfToken: string;
}

export default function ForgotPassword({ csrfToken }: IForgotPassword) {
  const toast = useToast();
  const router = useRouter();
  const passwordForm = useFormSchema({
    textButton: 'Recuperar contraseña',
    schema: forgotPasswordSchema,
    formFields: [
      {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        colClasses: 'col-span-6',
      },
    ],
  });
  const handleSubmit = async ({ email }: Inputs) => {
    return await strapiClient
      .post('/api/auth/forgot-password', {
        email,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }: any) => {
        const { user } = data;
        toast({
          message:
            'Registro exitoso! te hemos enviado un correo de confirmación a ' +
            user.email,
          type: 'success',
          time: 5000,
        });
        router.push('/auth/sign-in');
        return true;
      })
      .catch((error: { response: { status: number } }) => {
        const status = error.response.status;
        if (status === 400 || status === 405) {
          toast({
            message: 'El correo electrónico ya está registrado.',
            type: 'error',
          });
        }
        return false;
      });
  };
  return (
    <NoLayout
      bgWhite
      title={`${BUSINESS_NAME} - Iniciar sesión`}
      description='Ofrece y reserva servicios de todo tipo en muy poco tiempo para tener un control óptimo de tu agenda.'
    >
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='flex flex-col justify-items-center sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='flex justify-center'>
            <Logo className='text-5xl' />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Recuperar contraseña
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Ya tienes una cuenta?{' '}
            <Link
              href='/auth/sign-in'
              className='font-medium text-violet-600 hover:text-violet-500'
            >
              Inicia sesión
            </Link>
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white px-4 pb-8 shadow sm:rounded-lg sm:px-10'>
            {passwordForm.form({ csrfToken, onSubmit: handleSubmit })}
          </div>
        </div>
      </div>
    </NoLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
