import { InformationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export interface IToast {
  message: string;
  type: 'success' | 'error' | 'info';
  time?: number;
}

const Toast = ({ type = 'info', message }: IToast) => {
  const colorClasses = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={clsx('my-2 rounded-md p-4', colorClasses[type])}>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon
            className={clsx('h-5 w-5', colorClasses[type])}
            aria-hidden='true'
          />
        </div>
        <div className='flex-1 md:flex md:justify-between'>
          {/* <p className={clsx('text-sm', colorClasses[type])}>{title}</p> */}
          <p className='ml-2 text-sm md:mt-0'>
            <a
              href='#'
              className={clsx(
                'whitespace-nowrap font-medium',
                colorClasses[type]
              )}
            >
              {message}
              {/* <span aria-hidden='true'> &rarr;</span> */}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
