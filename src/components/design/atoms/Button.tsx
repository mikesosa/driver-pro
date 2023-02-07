import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  type: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          props.className,
          variant === 'secondary'
            ? props.disabled
              ? 'border-gray-300 bg-gray-300 text-gray-700 '
              : 'bg-whitetext-gray-700 border-gray-300 hover:bg-gray-300'
            : props.disabled
            ? 'border-transparent bg-gray-300 text-white hover:bg-gray-700 focus:ring-gray-300 '
            : 'border-transparent bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 ',

          'flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 '
        )}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
