/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import { GridProps } from '@aws-amplify/ui-react';
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
export declare type ServiceRequestCreateFormInputValues = any;
export declare type ServiceRequestCreateFormValidationValues = any;
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ServiceRequestCreateFormOverridesProps = {
  ServiceRequestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ServiceRequestCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ServiceRequestCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: ServiceRequestCreateFormInputValues
    ) => ServiceRequestCreateFormInputValues;
    onSuccess?: (fields: ServiceRequestCreateFormInputValues) => void;
    onError?: (
      fields: ServiceRequestCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ServiceRequestCreateFormInputValues
    ) => ServiceRequestCreateFormInputValues;
    onValidate?: ServiceRequestCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ServiceRequestCreateForm(
  props: ServiceRequestCreateFormProps
): React.ReactElement;
