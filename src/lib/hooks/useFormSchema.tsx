import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import Button from '@/components/design/atoms/Button';
import Input from '@/components/design/atoms/Input';

type FormField = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  colClasses?: string;
  inputClasses?: string;
};

interface useFormSchemaProps {
  schema: AnyObjectSchema;
  formFields: FormField[];
  textButton: string;
}

interface formProps {
  csrfToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<boolean>;
}

const useFormSchema = ({
  schema,
  formFields,
  textButton,
}: useFormSchemaProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getInputType = (type: string, field: FormField) => {
    switch (type) {
      case 'select':
        return 'select';
      default:
        return (
          <Input
            label={field.label}
            type={field.type}
            className={field.inputClasses}
            errors={errors}
            {...register(field.name)}
          />
        );
    }
  };

  const form = ({ csrfToken, onSubmit }: formProps) => (
    <form
      className='mt-6 grid grid-cols-1 gap-y-1 gap-x-4 space-y-6 sm:grid-cols-6'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(async (data) => {
          setLoading(true);
          await onSubmit(data)
            .then((res: boolean) => {
              if (!res) {
                setLoading(false);
              }
            })
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      {csrfToken && (
        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      )}

      {formFields.map((field, index) => (
        <div key={index} className={field.colClasses}>
          <Fragment key={index}>{getInputType(field.type, field)}</Fragment>
        </div>
      ))}
      <div className='col-span-6'>
        <Button
          type='submit'
          // loading={loading}
          disabled={loading}
          className='flex w-full justify-center'
        >
          {loading ? 'Cargando...' : textButton}
        </Button>
      </div>
    </form>
  );

  return { form, isLoading: loading };
};

export default useFormSchema;
