/* eslint-disable @typescript-eslint/ban-types */
/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import { GridProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import * as React from 'react';

import { ServiceRequest } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type ServiceRequestUpdateFormInputValues = {};
export declare type ServiceRequestUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ServiceRequestUpdateFormOverridesProps = {
  ServiceRequestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ServiceRequestUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ServiceRequestUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    serviceRequest?: ServiceRequest;
    onSubmit?: (
      fields: ServiceRequestUpdateFormInputValues
    ) => ServiceRequestUpdateFormInputValues;
    onSuccess?: (fields: ServiceRequestUpdateFormInputValues) => void;
    onError?: (
      fields: ServiceRequestUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ServiceRequestUpdateFormInputValues
    ) => ServiceRequestUpdateFormInputValues;
    onValidate?: ServiceRequestUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ServiceRequestUpdateForm(
  props: ServiceRequestUpdateFormProps
): React.ReactElement;
