import clsx from 'clsx';
import Head from 'next/head';

export interface INoLayoutProps {
  bgWhite?: boolean;
  children: React.ReactNode;
  noPadding?: boolean;
  title: string;
  description: string;
}

export function NoLayout({
  bgWhite,
  noPadding,
  children,
  title,
  description,
}: INoLayoutProps) {
  return (
    <div
      className={clsx(
        'h-screen',
        bgWhite ? 'bg-gray-100' : 'bg-gray-800',
        noPadding ? 'p-0' : 'py-4 px-3'
      )}
    >
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      {children}
    </div>
  );
}
