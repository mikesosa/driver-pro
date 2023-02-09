// import logo from '@assets/logo.svg';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn } from 'next-auth/react';

import { BUSINESS_NAME } from '@/lib/constants';
import useFormSchema from '@/lib/hooks/useFormSchema';
import useToast from '@/lib/hooks/useToast';
import { signInFormSchema } from '@/lib/schemas/signInFormSchema';

import { NoLayout } from '@/components/layout/NoLayout';

import Logo from '~/svg/logo.svg';

type Inputs = {
  email: string;
  password: string;
};

interface ISignIn {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: ISignIn) {
  const toast = useToast();
  const router = useRouter();
  const loginForm = useFormSchema({
    textButton: 'Iniciar sesión',
    schema: signInFormSchema,
    formFields: [
      {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        colClasses: 'col-span-6',
      },
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        colClasses: 'col-span-6',
        inputClasses: 'col-span-6',
      },
    ],
  });

  const handleSubmit = async ({ email, password }: Inputs) => {
    return await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((response: any) => {
      const { error, ok, url } = response;
      if (ok) {
        router.push(url);
        toast({
          message: 'Inicio de sesión exitoso!',
          type: 'success',
        });
        return true;
      } else {
        toast({
          message: error,
          type: 'error',
        });
        throw new Error(error);
      }
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
            Iniciar sesión
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            No tienes una cuenta?{' '}
            <Link
              href='/auth/sign-up'
              className='font-medium text-violet-600 hover:text-violet-500'
            >
              Regístrate
            </Link>
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            {loginForm.form({ csrfToken, onSubmit: handleSubmit })}
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white px-2 text-gray-500'>
                    O inicia sesión con
                  </span>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-3 gap-3'>
                <div>
                  <a
                    href='#'
                    className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                  >
                    <span className='sr-only'>Sign in with Facebook</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href='#'
                    className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                  >
                    <span className='sr-only'>Sign in with Twitter</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href='#'
                    className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                  >
                    <span className='sr-only'>Sign in with GitHub</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
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
