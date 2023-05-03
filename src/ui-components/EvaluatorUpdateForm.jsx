/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { Evaluator } from '../models';
import { fetchByPath, validateField } from './utils';
import { DataStore } from 'aws-amplify';
export default function EvaluatorUpdateForm(props) {
  const {
    id: idProp,
    evaluator: evaluatorModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [role, setRole] = React.useState(initialValues.role);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = evaluatorRecord
      ? { ...initialValues, ...evaluatorRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setRole(cleanValues.role);
    setErrors({});
  };
  const [evaluatorRecord, setEvaluatorRecord] =
    React.useState(evaluatorModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Evaluator, idProp)
        : evaluatorModelProp;
      setEvaluatorRecord(record);
    };
    queryData();
  }, [idProp, evaluatorModelProp]);
  React.useEffect(resetStateValues, [evaluatorRecord]);
  const validations = {
    firstName: [],
    lastName: [],
    email: [{ type: 'Email' }],
    role: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as='form'
      rowGap='15px'
      columnGap='15px'
      padding='20px'
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          email,
          role,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '') {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Evaluator.copyOf(evaluatorRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, 'EvaluatorUpdateForm')}
      {...rest}
    >
      <TextField
        label='First name'
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              role,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks('firstName', value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks('firstName', firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, 'firstName')}
      ></TextField>
      <TextField
        label='Last name'
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              role,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks('lastName', value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks('lastName', lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, 'lastName')}
      ></TextField>
      <TextField
        label='Email'
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              role,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks('email', value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks('email', email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, 'email')}
      ></TextField>
      <SelectField
        label='Role'
        placeholder='Please select an option'
        isDisabled={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              role: value,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks('role', value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks('role', role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, 'role')}
      >
        <option
          children='Admin'
          value='ADMIN'
          {...getOverrideProps(overrides, 'roleoption0')}
        ></option>
        <option
          children='Evaluator'
          value='EVALUATOR'
          {...getOverrideProps(overrides, 'roleoption1')}
        ></option>
      </SelectField>
      <Flex
        justifyContent='space-between'
        {...getOverrideProps(overrides, 'CTAFlex')}
      >
        <Button
          children='Reset'
          type='reset'
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || evaluatorModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex
          gap='15px'
          {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
        >
          <Button
            children='Submit'
            type='submit'
            variation='primary'
            isDisabled={
              !(idProp || evaluatorModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}