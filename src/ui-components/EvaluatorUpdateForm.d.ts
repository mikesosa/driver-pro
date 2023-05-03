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

import { Evaluator } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type EvaluatorUpdateFormInputValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};
export declare type EvaluatorUpdateFormValidationValues = {
  firstName?: ValidationFunction<string>;
  lastName?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  role?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type EvaluatorUpdateFormOverridesProps = {
  EvaluatorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  firstName?: PrimitiveOverrideProps<TextFieldProps>;
  lastName?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  role?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type EvaluatorUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: EvaluatorUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    evaluator?: Evaluator;
    onSubmit?: (
      fields: EvaluatorUpdateFormInputValues
    ) => EvaluatorUpdateFormInputValues;
    onSuccess?: (fields: EvaluatorUpdateFormInputValues) => void;
    onError?: (
      fields: EvaluatorUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: EvaluatorUpdateFormInputValues
    ) => EvaluatorUpdateFormInputValues;
    onValidate?: EvaluatorUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function EvaluatorUpdateForm(
  props: EvaluatorUpdateFormProps
): React.ReactElement;
