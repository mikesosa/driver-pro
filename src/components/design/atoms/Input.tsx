/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import React from 'react';
import { PatternFormat } from 'react-number-format';

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  errors?: any;
  name: string;
  label?: string;
  className?: string;
  format?: string;
  pattern?: string;
  allowEmptyFormatting?: boolean;
  mask?: string;
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'checkbox'
    | 'file';
}

const Input = React.forwardRef(
  (props: IInputProps, ref: React.Ref<HTMLInputElement>) => {
    const errorMessage = props.errors?.[props.name]?.message;
    const isCheckBox = props.type === 'checkbox';

    return (
      <div className={`${isCheckBox ? 'flex items-center' : ''}`}>
        {props.label && !isCheckBox && (
          <label
            htmlFor={props.name}
            className='mb-2 block text-sm font-medium text-gray-700'
          >
            {props.label}
          </label>
        )}

        {props.type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            onChange={(e: React.ChangeEvent<HTMLInputElement | any>) => {
              if (props.onChange) {
                return props?.onChange(
                  isCheckBox ? e.target.checked : e.target.value
                );
              }
            }}
            {...props}
            className={clsx(
              isCheckBox ? 'p-2' : 'px-4 py-3',
              props.type === 'textarea' ? 'rounded-2xl' : '',
              props.disabled
                ? ' border border-gray-300 bg-gray-100'
                : 'border border-gray-300 bg-white',
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-600 focus:ring-violet-600 sm:text-sm',
              props.className
            )}
          />
        ) : props.type === 'number' ? (
          <PatternFormat
            getInputRef={ref}
            allowEmptyFormatting={props.allowEmptyFormatting}
            mask={props.mask}
            className={clsx(
              isCheckBox ? 'rounded-sm p-2' : 'px-4 py-3',
              props.disabled && isCheckBox ? ' bg-gray-100' : '',
              props.disabled && !isCheckBox
                ? 'border-0 border-b-2 border-gray-300 bg-transparent text-gray-400'
                : 'rounded-3xl border border-gray-300 bg-white shadow-sm',
              props.className,
              'block w-full appearance-none sm:text-sm',
              'focus:border-violet-600 focus:outline-none focus:ring-violet-600'
            )}
            placeholder={props.placeholder}
            format={props.format || ''}
            pattern={props.pattern}
            inputMode='numeric'
            onValueChange={({ value }: any) => {
              const newEvent: any = {
                target: {
                  name: props.name,
                  value: value,
                },
              };

              if (props.onChange) {
                props.onChange(newEvent);
              }
            }}
          />
        ) : (
          <input
            id={props.name}
            ref={ref}
            onChange={(e) => {
              if (props.onChange) {
                return props?.onChange(
                  isCheckBox ? e.target.checked : (e.target.value as any)
                );
              }
            }}
            {...props}
            className={clsx(
              isCheckBox ? 'rounded-sm p-2' : 'px-4 py-3',
              props.disabled && isCheckBox ? ' bg-gray-100' : '',
              props.disabled && !isCheckBox
                ? 'border-0 border-b-2 border-gray-300 bg-transparent text-gray-400'
                : 'rounded-md border border-gray-300 bg-white shadow-sm',
              props.className,
              'block w-full appearance-none sm:text-sm',
              'focus:border-violet-600 focus:outline-none focus:ring-violet-600'
            )}
          />
        )}
        {errorMessage && !isCheckBox && (
          <label className='error ml-4 text-xs text-red-500'>
            {errorMessage}
          </label>
        )}

        {props.label && isCheckBox && (
          <label
            htmlFor={props.name}
            className={`absolute ml-7 text-sm font-medium ${
              errorMessage ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            {props.label}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
