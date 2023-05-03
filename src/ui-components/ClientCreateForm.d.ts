/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import * as React from 'react';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type ClientCreateFormInputValues = {
  name?: string;
};
export declare type ClientCreateFormValidationValues = {
  name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ClientCreateFormOverridesProps = {
  ClientCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClientCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ClientCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: ClientCreateFormInputValues
    ) => ClientCreateFormInputValues;
    onSuccess?: (fields: ClientCreateFormInputValues) => void;
    onError?: (
      fields: ClientCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ClientCreateFormInputValues
    ) => ClientCreateFormInputValues;
    onValidate?: ClientCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ClientCreateForm(
  props: ClientCreateFormProps
): React.ReactElement;
