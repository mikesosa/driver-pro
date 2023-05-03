/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import {
  GridProps,
  SelectFieldProps,
  TextFieldProps,
} from '@aws-amplify/ui-react';
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
export declare type EvaluatorCreateFormInputValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};
export declare type EvaluatorCreateFormValidationValues = {
  firstName?: ValidationFunction<string>;
  lastName?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  role?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type EvaluatorCreateFormOverridesProps = {
  EvaluatorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  firstName?: PrimitiveOverrideProps<TextFieldProps>;
  lastName?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  role?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type EvaluatorCreateFormProps = React.PropsWithChildren<
  {
    overrides?: EvaluatorCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: EvaluatorCreateFormInputValues
    ) => EvaluatorCreateFormInputValues;
    onSuccess?: (fields: EvaluatorCreateFormInputValues) => void;
    onError?: (
      fields: EvaluatorCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: EvaluatorCreateFormInputValues
    ) => EvaluatorCreateFormInputValues;
    onValidate?: EvaluatorCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function EvaluatorCreateForm(
  props: EvaluatorCreateFormProps
): React.ReactElement;
